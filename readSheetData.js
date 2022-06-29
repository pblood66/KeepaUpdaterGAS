/**
 * Gets the first date in interval "Update Settings" sheet
 * 
 * @return {String} date in ISO datetime format
 */
function getFirstDate() {
  var sheet = ss.getSheetByName("Update Settings");

  return getCellValue(2, 5, sheet).toISOString();
}

function getEndDate() {
  var sheet = ss.getSheetByName("Update Settings");

  return getCellValue(2, 6, sheet).toISOString();
}


/**
 * Gets both interval dates from "Update Settings" sheet
 * 
 * @return {String} dates in ISO datetime format
 */
function getIntervalDate() {
  var sheet = ss.getSheetByName("Update Settings");
  
  var startDate = getCellValue(2, 5, sheet).toISOString();
  var endDate = getCellValue(2, 6, sheet).toISOString();

  return startDate + "," + endDate;
}


/**
 * Gets all the chosen queries on the "Update Settings" sheet
 * 
 * @return {Array} Array with query name in even indices and boolean in odd indices
 */
function getUpdateValues() {
  sheet = ss.getSheetByName("Update Settings");
  
   let row = 2;
   settings = [];

  // Loop until it finds an empty cell in column A
  while (getCellValue(row, 1, sheet)) {
    //key value
    settings.push(getCellValue(row, 1, sheet));
    //update value
    settings.push(getCellValue(row, 2, sheet));

    ++row 
  }

  Logger.log(settings);

  return settings
}


/**
 * Gets the api access key from the "Access Key" sheet
 * 
 * @return {String} api access key
 */
function retrieveKey() {
  var sheet = ss.getSheetByName("Access Key");

  key = getCellValue(1, 2, sheet);
  return key 
}


/**
 * 
 */
function getCellValue(row, col, sheet) {
  var range = sheet.getRange(row, col);
  var cell = sheet.getRange(range.getA1Notation());

  return cell.getValue();
}