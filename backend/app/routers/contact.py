from fastapi import APIRouter, HTTPException, Request, status
from datetime import datetime, timezone
import json, os, uuid, logging

router = APIRouter()
logger = logging.getLogger(__name__)

# JSON file path — saved in backend folder
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "contacts.json")

def load_contacts():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_contacts(contacts):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)


@router.post("/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(request: Request):
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    logger.info(f"Received: {body}")

    # Validate
    errors = []
    name    = str(body.get("name",    "")).strip()
    email   = str(body.get("email",   "")).strip().lower()
    service = str(body.get("service", "")).strip()
    message = str(body.get("message", "")).strip()
    company = str(body.get("company", "")).strip() or None
    budget  = str(body.get("budget",  "")).strip() or None

    if len(name) < 2:    errors.append("Name must be at least 2 characters")
    if "@" not in email: errors.append("Valid email is required")
    if len(service) < 2: errors.append("Please select a service")
    if len(message) < 5: errors.append("Message must be at least 5 characters")

    if errors:
        raise HTTPException(status_code=422, detail=errors)

    # Save to JSON file
    entry = {
        "id":         str(uuid.uuid4()),
        "name":       name,
        "email":      email,
        "company":    company,
        "service":    service,
        "budget":     budget,
        "message":    message,
        "status":     "new",
        "created_at": datetime.now(timezone.utc).strftime("%d %b %Y %H:%M"),
    }

    contacts = load_contacts()
    contacts.insert(0, entry)  # newest first
    save_contacts(contacts)

    logger.info(f"✅ Saved: {name} <{email}> [{service}]")

    return {
        "success": True,
        "message": "Your enquiry has been received. We'll respond within 24 hours.",
        "id": entry["id"],
    }
