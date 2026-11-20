import json
import time
from xml.etree import ElementTree as ET
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    service = build("indexing", "v3", credentials=creds)

    # Read URLs from sitemap.xml
    tree = ET.parse("sitemap.xml")
    root = tree.getroot()
    namespace = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = [elem.text.strip() for elem in root.findall('.//ns:loc', namespace)]

    print(f"Submitting {len(urls)} URLs to Google Indexing API...", flush=True)

    success_count = 0
    fail_count = 0

    for idx, u in enumerate(urls, start=1):
        try:
            body = {
                "url": u,
                "type": "URL_UPDATED"
            }
            res = service.urlNotifications().publish(body=body).execute()
            print(f"[{idx}/{len(urls)}] SUCCESS: {u}", flush=True)
            success_count += 1
            time.sleep(0.3)
        except Exception as e:
            print(f"[{idx}/{len(urls)}] FAILED: {u} -> {e}", flush=True)
            fail_count += 1

    print(f"\nFinished: {success_count} succeeded, {fail_count} failed.", flush=True)

except Exception as e:
    print(f"Fatal error: {e}", flush=True)
