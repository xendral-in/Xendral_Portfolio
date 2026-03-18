from fastapi import APIRouter
from typing import List

from app.database import get_db
from app.models.service import ServiceOut

router = APIRouter()

# Static seed data — used as fallback if DB is empty
SEED_SERVICES = [
    {"num": "01", "icon": "🤖", "name": "AI & Machine Learning", "slug": "ai-ml",
     "desc": "Custom AI models, automation pipelines, and intelligent systems that transform your operations."},
    {"num": "02", "icon": "🌐", "name": "Web Development", "slug": "web-dev",
     "desc": "Full-stack web apps built with React, FastAPI, and MongoDB for blazing performance."},
    {"num": "03", "icon": "📱", "name": "Mobile Apps", "slug": "mobile",
     "desc": "Cross-platform iOS & Android apps with seamless UX and native performance."},
    {"num": "04", "icon": "🎨", "name": "UI/UX Design", "slug": "design",
     "desc": "Research-driven design systems that convert visitors into loyal customers."},
    {"num": "05", "icon": "☁️", "name": "Cloud & DevOps", "slug": "cloud",
     "desc": "Scalable cloud architecture, CI/CD pipelines, and 99.9% uptime SLAs."},
    {"num": "06", "icon": "🔒", "name": "Cybersecurity", "slug": "security",
     "desc": "Penetration testing, compliance audits, and zero-trust security architecture."},
    {"num": "07", "icon": "📈", "name": "SEO & Growth", "slug": "seo",
     "desc": "Data-driven SEO, performance marketing, and conversion optimization."},
    {"num": "08", "icon": "🎯", "name": "Brand Identity", "slug": "brand",
     "desc": "Strategic branding, visual identity systems, and market positioning."},
    {"num": "09", "icon": "📊", "name": "Data Analytics", "slug": "data",
     "desc": "Business intelligence dashboards and predictive analytics pipelines."},
    {"num": "10", "icon": "💼", "name": "IT Consulting", "slug": "consulting",
     "desc": "Strategic technology advisory to align your digital roadmap with business goals."},
]


@router.get(
    "/services",
    response_model=List[ServiceOut],
    summary="Get all services",
)
async def get_services():
    db = get_db()
    if db is None:
        return SEED_SERVICES

    docs = await db.services.find({}, {"_id": 0}).sort("num", 1).to_list(length=50)

    # Seed DB on first run
    if not docs:
        await db.services.insert_many(SEED_SERVICES)
        return SEED_SERVICES

    return docs


@router.post(
    "/services/seed",
    summary="(Admin) Seed default services into MongoDB",
    include_in_schema=False,
)
async def seed_services():
    db = get_db()
    await db.services.delete_many({})
    await db.services.insert_many(SEED_SERVICES)
    return {"seeded": len(SEED_SERVICES)}
