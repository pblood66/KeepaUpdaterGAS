// Menu ui
// Triggered on file start-up
function onOpen(e) {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Product Tracker')
    .addItem('Access Key', 'getAccessKey')
    .addItem('Update All', 'updateSheetBatches')
    .addItem('Update Product', 'flexibleUpdateProductBatches')
    .addItem('Refresh Tokens', 'refreshToken')
    .addToUi();
}

function validateAsins() {
  var sheet = ss.getSheetByName("Products");
  var selection = ss.getSelection();
  var activeRange = selection.getActiveRange();
  var lastRow = activeRange.getLastRow();
  var column = activeRange.getLastColumn();
  var firstRow = lastRow - activeRange.getValues().length + 1;
  var currentRow = firstRow;

  for (currentRow; currentRow < lastRow; ++currentRow) {
    let currAsin = getCellValue(currentRow, column, sheet);
    if (currAsin.length != 10) {
      sheet.getRange(currentRow, column).setBackground("red");
    }
    else {
      sheet.getRange(currentRow, column).setBackground("white");
    }
  }
}

function getAccessKey() {
  var ui = SpreadsheetApp.getUi(); // Same variations.

  var result = ui.prompt(
    'Access Key',
    'Please enter your Keepa API access key:',
    ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var key = result.getResponseText();

  if (button == ui.Button.OK) {
    if (key === "") {
      return;
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Access Key");
    if (sheet == null) {
      ss.insertSheet('Access Key');
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Access Key");
    }
    updateCell(1, 1, "Access Key:", sheet)
    updateCell(1, 2, key, sheet);
  }
}