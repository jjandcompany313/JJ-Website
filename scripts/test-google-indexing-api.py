from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_FILE = "service_account.json"
SCOPES = ["https://www.googleapis.com/auth/indexing"]

try:
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    service = build("indexing", "v3", credentials=creds)
    
    body = {
        "url": "https://jjandcompany.net/products/rollers.html",
        "type": "URL_UPDATED"
    }
    res = service.urlNotifications().publish(body=body).execute()
    print("Google Indexing API Success!")
    print(res)
except Exception as e:
    print(f"Google Indexing API Error: {e}")
