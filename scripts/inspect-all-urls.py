import json
import time
import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
service = build("searchconsole", "v1", credentials=creds)

site_url = "https://jjandcompany.net/"

test_urls = [
    "https://jjandcompany.net/",
    "https://jjandcompany.net/products.html",
    "https://jjandcompany.net/dealer.html",
    "https://jjandcompany.net/products/rollers.html",
    "https://jjandcompany.net/products/brushes.html",
    "https://jjandcompany.net/products/accessories.html",
    "https://jjandcompany.net/locations/jalgaon.html"
]

print(f"Inspecting {len(test_urls)} core URLs in Google Search Console...", flush=True)

results = []
for u in test_urls:
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
        robots = idx.get("robotsTxtState", "Unknown")
        print(f"[{verdict}] {u} | Coverage: {coverage} | Last Crawl: {last_crawl}", flush=True)
        results.append({
            "url": u,
            "verdict": verdict,
            "coverage": coverage,
            "last_crawl": last_crawl
        })
        time.sleep(0.5)
    except Exception as e:
        print(f"[ERROR] {u}: {e}", flush=True)

with open("scripts/inspection_results.json", "w") as f:
    json.dump(results, f, indent=2)
print("Finished URL inspection.", flush=True)
