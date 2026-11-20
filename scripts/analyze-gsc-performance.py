import json
from google.oauth2 import service_account
from googleapiclient.discovery import build

creds = service_account.Credentials.from_service_account_file(
    'service_account.json',
    scopes=['https://www.googleapis.com/auth/webmasters.readonly']
)
service = build('searchconsole', 'v1', credentials=creds)

resp_pages = service.searchanalytics().query(
    siteUrl='https://jjandcompany.net/',
    body={
        'startDate': '2026-10-01',
        'endDate': '2026-11-20',
        'dimensions': ['page'],
        'rowLimit': 50
    }
).execute()

print('=== Performance by Page ===')
for row in resp_pages.get('rows', []):
    print(f"Page: {row['keys'][0]} | Clicks: {row['clicks']} | Imp: {row['impressions']} | CTR: {row['ctr']*100:.1f}% | Pos: {row['position']:.1f}")

resp_qp = service.searchanalytics().query(
    siteUrl='https://jjandcompany.net/',
    body={
        'startDate': '2026-10-01',
        'endDate': '2026-11-20',
        'dimensions': ['query', 'page'],
        'rowLimit': 50
    }
).execute()

print('\n=== Performance by Query + Page ===')
for row in resp_qp.get('rows', []):
    print(f"Query: '{row['keys'][0]}' -> Page: {row['keys'][1]} | Clicks: {row['clicks']} | Imp: {row['impressions']} | Pos: {row['position']:.1f}")

resp_queries = service.searchanalytics().query(
    siteUrl='https://jjandcompany.net/',
    body={
        'startDate': '2026-10-01',
        'endDate': '2026-11-20',
        'dimensions': ['query'],
        'rowLimit': 50
    }
).execute()

print('\n=== Top Queries ===')
for row in resp_queries.get('rows', []):
    print(f"Query: '{row['keys'][0]}' | Clicks: {row['clicks']} | Imp: {row['impressions']} | CTR: {row['ctr']*100:.1f}% | Pos: {row['position']:.1f}")
