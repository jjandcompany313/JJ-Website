import json
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

try:
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    service = build("searchconsole", "v1", credentials=creds)
    
    # 1. List sites
    sites_resp = service.sites().list().execute()
    sites = sites_resp.get("siteEntry", [])
    print(f"Successfully authenticated! Found {len(sites)} site(s):")
    for s in sites:
        print(f" - Site URL: {s.get('siteUrl')} (Permission: {s.get('permissionLevel')})")

    # If jjandcompany site is present, let's inspect sitemaps and search analytics
    target_site = None
    for s in sites:
        url = s.get('siteUrl', '')
        if 'jjandcompany' in url:
            target_site = url
            break

    if target_site:
        print(f"\n--- Checking Sitemaps for {target_site} ---")
        try:
            sm_resp = service.sitemaps().list(siteUrl=target_site).execute()
            sitemaps = sm_resp.get("sitemap", [])
            print(f"Found {len(sitemaps)} sitemap(s):")
            for sm in sitemaps:
                print(f"  * Path: {sm.get('path')}, Last Downloaded: {sm.get('lastDownloaded')}, Warnings: {sm.get('warnings')}, Errors: {sm.get('errors')}")
                contents = sm.get("contents", [])
                for c in contents:
                    print(f"    - Type: {c.get('type')}, Submitted: {c.get('submitted')}, Indexed: {c.get('indexed')}")
        except Exception as e:
            print(f"Error fetching sitemaps: {e}")

        print(f"\n--- Checking URL Inspection for homepage ---")
        try:
            inspect_request = {
                "inspectionUrl": "https://jjandcompany.net/",
                "siteUrl": target_site
            }
            res = service.urlInspection().index().inspect(body=inspect_request).execute()
            result = res.get("inspectionResult", {})
            idx_result = result.get("indexStatusResult", {})
            print("Homepage Inspection:")
            print(f"  * Verdict: {idx_result.get('verdict')}")
            print(f"  * Coverage State: {idx_result.get('coverageState')}")
            print(f"  * Crawled As: {idx_result.get('crawledAs')}")
            print(f"  * Last Crawl Time: {idx_result.get('lastCrawlTime')}")
            print(f"  * Page Fetch State: {idx_result.get('pageFetchState')}")
            print(f"  * Robots TXT State: {idx_result.get('robotsTxtState')}")
            print(f"  * Indexing State: {idx_result.get('indexingState')}")
        except Exception as e:
            print(f"Error inspecting homepage: {e}")

        print(f"\n--- Checking Performance Search Analytics (Last 28 Days) ---")
        try:
            perf_request = {
                "startDate": "2026-10-20",
                "endDate": "2026-11-19",
                "dimensions": ["query"],
                "rowLimit": 10
            }
            analytics = service.searchanalytics().query(siteUrl=target_site, body=perf_request).execute()
            rows = analytics.get("rows", [])
            print(f"Top {len(rows)} queries in the last 28 days:")
            for r in rows:
                print(f"  * Query: '{r.get('keys')[0]}' | Clicks: {r.get('clicks')} | Imp: {r.get('impressions')} | CTR: {r.get('ctr'):.2%} | Pos: {r.get('position'):.1f}")
            if not rows:
                print("  (No query rows recorded yet in GSC)")
        except Exception as e:
            print(f"Error fetching search analytics: {e}")

except Exception as e:
    print(f"Authentication / API error: {e}")
