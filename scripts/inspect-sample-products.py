import json
import time
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
service = build("searchconsole", "v1", credentials=creds)

site_url = "https://jjandcompany.net/"

product_urls = [
    "https://jjandcompany.net/products/wallfin-blue-line-paint-roller.html",
    "https://jjandcompany.net/products/wallfin-yellow-line-paint-roller.html",
    "https://jjandcompany.net/products/panama-222-paint-brush.html",
    "https://jjandcompany.net/products/panama-cat-pure-bristol-paint-brush.html",
    "https://jjandcompany.net/products/cumi-abrasives-machine-paper.html"
]

print(f"Inspecting 5 sample product URLs in GSC...", flush=True)

for u in product_urls:
    try:
        body = {
            "inspectionUrl": u,
            "siteUrl": site_url
        }
        res = service.urlInspection().index().inspect(body=body).execute()
        r = res.get("inspectionResult", {})
        idx = r.get("indexStatusResult", {})
        verdict = idx.get("verdict", "UNKNOWN")
        coverage = idx.get("coverageState", "Unknown")
        last_crawl = idx.get("lastCrawlTime", "Never crawled")
        print(f"[{verdict}] {u} | Coverage: {coverage} | Last Crawl: {last_crawl}", flush=True)
        time.sleep(0.5)
    except Exception as e:
        print(f"[ERROR] {u}: {e}", flush=True)
