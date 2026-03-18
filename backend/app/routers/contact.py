from fastapi import APIRouter, HTTPException, Request, status
from datetime import datetime, timezone
import logging

from app.database import get_db

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(request: Request):
    """Accept any JSON, validate manually, save to MongoDB."""
    db = get_db()

    # Parse raw body so we can log exactly what arrived
    try:
        body = await request.json()
    except Exception as e:
        logger.error(f"Bad JSON: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    logger.info(f"Received contact submission: {body}")

    # ── Manual validation ──────────────────────────────────
    errors = []

    name = str(body.get("name", "")).strip()
    if len(name) < 2:
        errors.append("name must be at least 2 characters")

    email = str(body.get("email", "")).strip().lower()
    if len(email) < 5 or "@" not in email:
        errors.append("valid email is required")

    service = str(body.get("service", "")).strip()
    if len(service) < 2:
        errors.append("service is required")

    message = str(body.get("message", "")).strip()
    if len(message) < 5:
        errors.append("message must be at least 5 characters")

    company = str(body.get("company", "")).strip() or None
    budget  = str(body.get("budget",  "")).strip() or None

    if errors:
        logger.warning(f"Validation errors: {errors}")
        raise HTTPException(status_code=422, detail=errors)

    # ── Save to MongoDB ────────────────────────────────────
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    doc = {
        "name":       name,
        "email":      email,
        "company":    company,
        "service":    service,
        "budget":     budget,
        "message":    message,
        "status":     "new",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }

    result = await db.contacts.insert_one(doc)
    logger.info(f"✅ Saved contact: {name} <{email}> [{service}] id={result.inserted_id}")

    return {
        "success": True,
        "message": "Your enquiry has been received. We'll respond within 24 hours.",
        "id": str(result.inserted_id),
    }
