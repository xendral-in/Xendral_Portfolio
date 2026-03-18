from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from app.database import get_db

router = APIRouter()


def serialize_doc(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    if isinstance(doc.get("created_at"), datetime):
        doc["created_at"] = doc["created_at"].isoformat()
    if isinstance(doc.get("updated_at"), datetime):
        doc["updated_at"] = doc["updated_at"].isoformat()
    return doc


@router.get(
    "/submissions",
    summary="(Admin) List all contact submissions",
    include_in_schema=False,
)
async def list_submissions(
    status: Optional[str] = Query(None, description="Filter by status: new | read | replied"),
    limit:  int           = Query(50, ge=1, le=200),
    skip:   int           = Query(0, ge=0),
):
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    query = {}
    if status:
        query["status"] = status

    cursor = db.contacts.find(query).sort("created_at", -1).skip(skip).limit(limit)
    docs   = await cursor.to_list(length=limit)
    total  = await db.contacts.count_documents(query)

    return {
        "total": total,
        "skip":  skip,
        "limit": limit,
        "items": [serialize_doc(d) for d in docs],
    }


@router.patch(
    "/submissions/{submission_id}/status",
    summary="(Admin) Update submission status",
    include_in_schema=False,
)
async def update_status(submission_id: str, new_status: str):
    db = get_db()
    if new_status not in ("new", "read", "replied"):
        raise HTTPException(status_code=400, detail="Invalid status")

    result = await db.contacts.update_one(
        {"_id": ObjectId(submission_id)},
        {"$set": {"status": new_status, "updated_at": datetime.utcnow()}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")

    return {"success": True, "status": new_status}


@router.delete(
    "/submissions/{submission_id}",
    summary="(Admin) Delete a submission",
    include_in_schema=False,
)
async def delete_submission(submission_id: str):
    db = get_db()
    result = await db.contacts.delete_one({"_id": ObjectId(submission_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"success": True, "deleted": submission_id}
