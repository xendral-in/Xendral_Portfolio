from fastapi import APIRouter, HTTPException
import json, os

router = APIRouter()

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "contacts.json")

def load_contacts():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_contacts(contacts):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(contacts, f, indent=2, ensure_ascii=False)


@router.get("/submissions", include_in_schema=False)
async def list_submissions(status: str = None):
    contacts = load_contacts()
    if status:
        contacts = [c for c in contacts if c.get("status") == status]
    return {"total": len(contacts), "items": contacts}


@router.patch("/submissions/{submission_id}/status", include_in_schema=False)
async def update_status(submission_id: str, new_status: str):
    if new_status not in ("new", "read", "replied"):
        raise HTTPException(status_code=400, detail="Invalid status")
    contacts = load_contacts()
    for c in contacts:
        if c["id"] == submission_id:
            c["status"] = new_status
            save_contacts(contacts)
            return {"success": True, "status": new_status}
    raise HTTPException(status_code=404, detail="Not found")


@router.delete("/submissions/{submission_id}", include_in_schema=False)
async def delete_submission(submission_id: str):
    contacts = load_contacts()
    new_list = [c for c in contacts if c["id"] != submission_id]
    if len(new_list) == len(contacts):
        raise HTTPException(status_code=404, detail="Not found")
    save_contacts(new_list)
    return {"success": True}
