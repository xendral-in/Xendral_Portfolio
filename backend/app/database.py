import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME     = os.getenv("DB_NAME", "xendral")

client: AsyncIOMotorClient = None
db = None


async def connect_db():
    global client, db
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DB_NAME]
    # Ensure indexes
    await db.contacts.create_index("email")
    await db.contacts.create_index("created_at")
    print(f"✅  Connected to MongoDB: {DB_NAME}")


async def close_db():
    global client
    if client:
        client.close()
        print("🔌  MongoDB connection closed")


def get_db():
    return db
