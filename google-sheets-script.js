/**
 * =========================================================================
 * JJ & COMPANY — GOOGLE APPS SCRIPT FOR DIRECT GOOGLE SHEET CAPTURE
 * =========================================================================
 * 
 * Follow these 5 quick steps to have all website inquiries saved
 * directly into your private Google Sheet in real time:
 * 
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet
 *    "JJ & Company Customer Inquiries".
 * 
 * 2. In Google Sheets, click the top menu:
 *    Extensions -> Apps Script
 * 
 * 3. Delete any code inside Code.gs, and PASTE THIS ENTIRE FILE.
 * 
 * 4. In the top right of Apps Script, click:
 *    Deploy -> New deployment
 *    - Click the gear icon next to "Select type" and select "Web app"
 *    - Description: "JJ Website Inquiry Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (Required so your website can send inquiries)
 *    - Click "Deploy", and authorize permissions.
 * 
 * 5. Copy the generated "Web App URL" (ends in /exec), and send it to me
 *    OR paste it in:
 *    js/site-data.js -> SITE_CONFIG.leadWebhookUrl
 *    
 * That's it! Every time someone submits the form on your website:
 * - A new row is instantly added to your private Google Sheet.
 * - No files are downloaded.
 * - All inquiry data remains 100% confidential.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // Wait up to 10 seconds for concurrent requests

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create header row automatically if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
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
      
      // Format headers with dark green company brand color
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#06392A");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Parse incoming data safely
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var contactPerson = data.contactPerson || data.name || "N/A";
    var shopName = data.shopName || data.businessName || "Direct Inquiry";
    var phone = data.phone || "N/A";
    var district = data.district || data.city || "N/A";
    var inquiryType = data.inquiryType || data.monthlyVolume || "General Inquiry";
    var products = data.products || "All Products Range";
    var message = data.message || "—";
    var status = data.status || "New Lead";
    var source = data.source || "Website Form";

    // Append inquiry as a new row
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

    // Return success response
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
