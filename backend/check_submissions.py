"""
Quick script to view all contact form submissions from MongoDB.
Run: python check_submissions.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime

MONGODB_URL = "mongodb://localhost:27017"
DB_NAME = "xendral"

async def main():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DB_NAME]
    
    contacts = await db.contacts.find({}).sort("created_at", -1).to_list(length=100)
    
    if not contacts:
        print("No submissions yet.")
    else:
        print(f"\n{'='*60}")
        print(f"  XENDRAL — Contact Submissions ({len(contacts)} total)")
        print(f"{'='*60}\n")
        for c in contacts:
            print(f"  Name   : {c.get('name')}")
            print(f"  Email  : {c.get('email')}")
            print(f"  Company: {c.get('company') or '—'}")
            print(f"  Service: {c.get('service')}")
            print(f"  Budget : {c.get('budget') or '—'}")
            print(f"  Status : {c.get('status')}")
            dt = c.get('created_at')
            if isinstance(dt, datetime):
                print(f"  Date   : {dt.strftime('%d %b %Y %H:%M')}")
            print(f"  Message: {c.get('message', '')[:80]}...")
            print(f"  {'-'*55}")
    
    client.close()

asyncio.run(main())
