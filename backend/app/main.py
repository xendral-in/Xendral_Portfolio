from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import contact, services, submissions

app = FastAPI(
    title="Xendral Portfolio API",
    description="Backend API for Xendral company portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://xendral.in",
        "https://www.xendral.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router,     prefix="/api", tags=["Contact"])
app.include_router(services.router,    prefix="/api", tags=["Services"])
app.include_router(submissions.router, prefix="/api", tags=["Submissions"])

@app.get("/")
async def root():
    return {"status": "ok", "message": "Xendral API is running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "version": "1.0.0"}
