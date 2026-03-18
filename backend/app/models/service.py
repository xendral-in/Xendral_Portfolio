from pydantic import BaseModel, Field
from typing import Optional


class ServiceOut(BaseModel):
    num:  str
    icon: str
    name: str
    desc: str
    slug: Optional[str] = None
