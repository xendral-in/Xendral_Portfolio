"""
View all contact form submissions.
Run: python check_submissions.py
"""
import json, os

DATA_FILE = os.path.join(os.path.dirname(__file__), "contacts.json")

if not os.path.exists(DATA_FILE):
    print("No submissions yet. contacts.json not found.")
else:
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        contacts = json.load(f)

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
            print(f"  Date   : {c.get('created_at')}")
            print(f"  Message: {c.get('message','')[:80]}")
            print(f"  {'-'*55}")
