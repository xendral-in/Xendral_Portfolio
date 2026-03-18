from fastapi import APIRouter

router = APIRouter()

SERVICES = [
    {"num": "01", "icon": "🌐", "name": "Website Development",  "desc": "Fast, secure and scalable websites built with modern frameworks for maximum performance."},
    {"num": "02", "icon": "📱", "name": "App Development",       "desc": "Native and cross-platform mobile apps delivering seamless experiences on iOS and Android."},
    {"num": "03", "icon": "📈", "name": "Digital Marketing",     "desc": "Data-driven campaigns covering SEO, social media, PPC, and content marketing."},
    {"num": "04", "icon": "📊", "name": "Data Analysis",         "desc": "Transform raw data into actionable insights with advanced analytics and dashboards."},
    {"num": "05", "icon": "⚙️", "name": "Custom Software",       "desc": "Bespoke software solutions architected precisely to your requirements."},
    {"num": "06", "icon": "🎬", "name": "Video Editing",         "desc": "Professional video production and post-production for ads, reels, and corporate films."},
    {"num": "07", "icon": "🖥️", "name": "UI/UX Design",          "desc": "Intuitive and striking interfaces – wireframes, prototypes, and complete UX systems."},
    {"num": "08", "icon": "🤖", "name": "AI Automation",         "desc": "Intelligent automation that eliminates repetitive work and accelerates business operations."},
    {"num": "09", "icon": "🎨", "name": "Graphic Designing",     "desc": "Bold visual identities, brand collateral, and marketing materials built to impact."},
    {"num": "10", "icon": "🔒", "name": "Cyber Security",        "desc": "End-to-end security audits, threat protection, and compliance for your digital assets."},
]

@router.get("/services")
async def get_services():
    return SERVICES
