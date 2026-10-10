/**
 * =========================================================================
 * JJ & COMPANY — GOOGLE APPS SCRIPT FOR REAL-TIME SPREADSHEET SYNC
 * =========================================================================
 * 
 * Follow these 5 quick steps to have all website inquiries automatically
 * added to a live Google Sheet in real time:
 * 
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet
 *    "JJ & Company Inquiries".
 * 
 * 2. In Google Sheets, click the top menu:
 *    Extensions -> Apps Script
 * 
 * 3. Delete any default code inside the Apps Script editor, and PASTE THIS
 *    ENTIRE FILE into Code.gs.
 * 
 * 4. In the top right of Apps Script, click:
 *    Deploy -> New deployment
 *    - Click the gear icon next to "Select type" and choose "Web app"
 *    - Description: "JJ Website Lead Capture"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (Crucial for receiving submissions from the website)
 *    - Click "Deploy", authorize permissions when prompted.
 * 
 * 5. Copy the generated "Web App URL" (ends in /exec), and paste it in:
 *    js/site-data.js -> SITE_CONFIG.leadWebhookUrl
 *    
 * That's it! Every time someone submits the form on your website, a new row
 * will immediately appear in your Google Sheet!
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create header row if sheet is currently blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Contact Person",
        "Business / Shop Name",
        "Phone / WhatsApp",
        "City & State",
        "Purpose of Inquiry",
        "Products of Interest",
        "Requirement / Message",
        "Status",
        "Source"
      ]);
      
      // Format headers with bold text and dark green background
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#06392A");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Parse incoming JSON data
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var contactPerson = data.contactPerson || data.name || "N/A";
    var shopName = data.shopName || data.businessName || "Direct Inquiry";
    var phone = data.phone || "N/A";
    var district = data.district || data.city || "N/A";
    var inquiryType = data.inquiryType || data.monthlyVolume || "General Inquiry";
    var products = data.products || "All Range";
    var message = data.message || "None";
    var status = data.status || "New Lead";
    var source = data.source || "Website Form";

    // Append new lead as row
    sheet.appendRow([
      timestamp,
      contactPerson,
      shopName,
      phone,
      district,
      inquiryType,
      products,
      message,
      status,
      source
    ]);

    // Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "JJ & Company Webhook is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
