# JJ & Company — Form-to-Excel & Google Sheet Integration Guide

This guide explains how the **Dealership Qualification Form** (`dealer.html`) and **Contact Inquiry Form** (`contact.html`) are connected to Microsoft Excel and Google Sheets.

---

## 📁 1. Included Excel Files in this Repository

| File | Description |
| :--- | :--- |
| **`JJ_Company_Dealer_Applications.csv`** | Pre-formatted standard UTF-8 CSV spreadsheet with columns matching every field of your dealership form. Opens directly in Microsoft Excel, Google Sheets, or Apple Numbers. |
| **`JJ_Company_Dealer_Applications.xls`** | Styled Microsoft Excel Workbook with formatted navy headers (`#0F172A`), bold white typography, column widths, and sample lead records. |
| **`google-apps-script.js`** | Complete, zero-dependency webhook script that connects your live Google Sheet / Excel Online to the website in 2 minutes. |

---

## ⚡ 2. Automatic Real-Time Spreadsheet Columns

Every application submitted on your website records the following columns in real time:

1. **`Timestamp`**: Date & time of submission (e.g. `2026-10-05 10:30:00`)
2. **`Business / Shop Name`**: Name of the dealer's store / company
3. **`Contact Person`**: Name of owner or purchasing manager
4. **`City / District`**: Selected district (Mumbai, Thane, Pune, Nashik, etc.)
5. **`Phone / WhatsApp`**: Contact mobile / WhatsApp number
6. **`Monthly Volume Range`**: Expected monthly order volume (₹25k–₹50k, ₹50k–₹2L, ₹2L–₹5L, ₹5L+)
7. **`Products Interested In`**: Rollers, Brushes, Sandpaper, Thinner, Putty Knives, Tapes
8. **`Lead Status`**: Defaults to `New Lead` (can be updated to `Contacted`, `Sample Dispatched`, `Approved Dealer`)
9. **`Source Page`**: Identifies whether lead originated from the Dealer Portal or Contact Page

---

## 🚀 3. How to Connect Your Live Google Sheet / Excel Online (2 Minutes)

You can connect your live online spreadsheet so every lead appears immediately on your phone and laptop:

### Step 1: Create Your Google Sheet
1. Go to [https://sheets.new](https://sheets.new) in your browser.
2. Name the sheet: **`JJ & Company - Dealer Leads`**.

### Step 2: Paste the Automation Script
1. In Google Sheets, click the top menu: **Extensions** &rarr; **Apps Script**.
2. Delete any code in the editor, and copy-paste the entire code from **[`google-apps-script.js`](./google-apps-script.js)**.
3. Click the blue **Save** (💾) icon.

### Step 3: Deploy as Webhook
1. In the top-right corner, click **Deploy** &rarr; **New deployment**.
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `JJ Dealer Leads Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Note: This allows the website form to push submissions without requiring visitors to sign in).*
4. Click **Deploy**.
5. Copy the **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Paste URL into Website Config
1. Open [`js/site-data.js`](./js/site-data.js).
2. Locate line 45:
   ```javascript
   leadWebhookUrl: "PASTE_YOUR_COPIED_URL_HERE",
   ```
3. Save the file! That's it! Every visitor form submission will now instantly appear in your Google Sheet!

> [!TIP]
> **Using Microsoft Excel Online (OneDrive)?**
> You can also link Google Sheets directly into Microsoft Excel on your computer via **Excel > Data > From Web**, or use a Power Automate flow with the same webhook payload.

---

## 💾 4. Built-in 1-Click Excel CSV Export (No Server Required)

Even before connecting a cloud webhook:
- The website automatically saves every submission securely in the browser's persistent storage.
- A **`📥 Download Excel (.csv)`** button is built into the bottom of the form on [`dealer.html`](./dealer.html).
- Clicking it immediately downloads all captured applications as a clean Excel `.csv` file with full formatting and UTF-8 encoding.
