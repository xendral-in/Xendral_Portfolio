from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime


class ContactIn(BaseModel):
    name:    str           = Field(..., min_length=2, max_length=100)
    email:   str           = Field(..., min_length=5, max_length=200)
    company: Optional[str] = Field(None, max_length=120)
    service: str           = Field(..., min_length=2, max_length=100)
    budget:  Optional[str] = None
    message: str           = Field(..., min_length=5, max_length=2000)

    # Convert empty strings "" to None for optional fields
    @field_validator("company", "budget", mode="before")
    @classmethod
    def empty_str_to_none(cls, v):
        if v == "" or v is None:
            return None
        return v


class ContactOut(BaseModel):
    id:         str
    name:       str
    email:      str
    company:    Optional[str]
    service:    str
    budget:     Optional[str]
    message:    str
    created_at: datetime
    status:     str


class ContactResponse(BaseModel):
    success: bool
    message: str
    id:      Optional[str] = None
