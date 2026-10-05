/**
 * =========================================================================
 * JJ & COMPANY — AUTOMATED GOOGLE SHEETS / EXCEL CONNECTOR
 * =========================================================================
 * This script runs in Google Sheets (or Excel Online) as a Webhook Web App.
 * Every time a user submits the Dealership Qualification Form on the website,
 * this script automatically appends the form data as a new row in your sheet.
 *
 * QUICK 3-STEP SETUP:
 * 1. Open Google Sheets (https://sheets.new) and name it "JJ & Company - Dealer Leads".
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete existing code, paste this entire file, and click "Deploy" > "New deployment".
 *    - Select type: "Web app"
 *    - Description: "JJ Dealer Form Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (allows website form submissions without login)
 * 4. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 5. Paste the URL into `js/site-data.js` under `SITE_CONFIG.leadWebhookUrl`.
 * =========================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse incoming data (handles both FormData / URL-encoded and JSON payloads)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // Ensure Header Row exists with professional formatting
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Business / Shop Name",
        "Contact Person",
        "City / District",
        "Phone / WhatsApp",
        "Monthly Volume Range",
        "Products Interested In",
        "Lead Status",
        "Source Page"
      ];
      sheet.appendRow(headers);
      
      // Style header row (JJ & Company Navy brand color)
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    // Extract values
    var timestamp = new Date();
    var shopName = data.shopName || data.businessName || "N/A";
    var contactPerson = data.contactPerson || data.name || "N/A";
    var district = data.district || data.city || "N/A";
    var phone = data.phone || data.mobile || "N/A";
    var monthlyVolume = data.monthlyVolume || "Not Specified";
    var products = data.products || "All Accessories";
    var status = data.status || "New Lead";
    var source = data.source || "Website Dealership Form";

    // Append the new lead row
    sheet.appendRow([
      timestamp,
      shopName,
      contactPerson,
      district,
      phone,
      monthlyVolume,
      products,
      status,
      source
    ]);

    // Format new row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.getRange(lastRow, 8).setBackground("#E0F2FE").setFontColor("#0369A1").setFontWeight("bold"); // Status pill color

    // Auto-fit column widths
    for (var col = 1; col <= 9; col++) {
      sheet.autoResizeColumn(col);
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Lead recorded in spreadsheet successfully.",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "JJ & Company Spreadsheet Webhook",
    timestamp: new Date()
  })).setMimeType(ContentService.MimeType.JSON);
}
