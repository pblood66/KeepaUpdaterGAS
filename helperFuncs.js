function findNearIndex(arr, value) {
  for (let i = 0; i < arr.length / 2; ++i) {
    if (arr[i * 2] <= value && arr[(i * 2) + 2] >= value) {
      return i * 2;
    }
  }
}

/**
 * 
 * @param {Array} arr 
 * @param {Number} val 
 * @returns array of indexes with a certain value
 */
function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

/**
 * updates entire product
 * 
 * @param {Number} Row number
 * @param {Object} Product object
 * @return {void}  
 */
function updateRow(row, product, settings) {
  var sheet = ss.getSheetByName("Products");

  for (let i = 0; i < settings.length / 2; i++) {
    if (settings[(i * 2) + 1]) {
      try {
        let value = product[settings[i * 2]];
        updateCell(row, i + 2, value, sheet)
      }
      catch (err) {
        Logger.log(err);
        updateCell(row, i + 2, "Unavailable", sheet)
      }
    }
  }
}

function updateRow(row, column, product, settings) {
  var sheet = ss.getSheetByName("Products");

  if (product == 0) {
    updateCell(row, column + 1, "Invalid ASIN", sheet);
    return;
  }

  for (let i = 0; i < settings.length / 2; i++) {
    if (settings[(i * 2) + 1]) {
      let currCol = column + i;
      try {
        let value = product[settings[i * 2]];
        updateCell(row, currCol, value, sheet)
      }
      catch (err) {
        Logger.log(err);
        updateCell(row, currCol, "Unavailable", sheet)
      }
    }
  }
}

/**
 * Updates a single cell
 * 
 * @param {number} Row number
 * @param {number} Column expressed as a number
 * @param {string} Data to update cell to
 * @param {Object} Google sheet object (specifies which worksheet to update)
 * @return {String} encoded url endpoint 
 */
function updateCell(row, col, data, sheet) {
  var range = sheet.getRange(row, col);
  var cell = sheet.getRange(range.getA1Notation());

  // if no data is given, print as data unavailable
  if (data < 0 || data == null) {
    cell.setValue("Unavailable");
  }
  else if (data === "Invalid ASIN") {
    cell.setValue(data);
  }
  else {
    cell.setValue(data);
  }
}

/**
 * Converts from datetime to "Keepa Time"
 * 
 * @param {String} date expressed in ISO 8601 
 * @return {number} date expressed in keepa minutes 
 */
function convertToKeepaMin(date) {
  let minutes = Math.floor(new Date(date).getTime() / 60000)
  let keepaMinutes = minutes - 21564000
  return keepaMinutes;
}

// Convert from keepa minutes to standard datetime
/**
 * Converts from "Keepa Time" to standard locale datetime
 * 
 * @param {number} keepa minutes 
 * @return {string} date in standard locale
 */
function convertToDate(keepaMinutes) {
  epochTime = keepaMinutes + 21564000;
  epochTime *= 60;

  var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
  date.setUTCSeconds(epochTime);

  return date.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
}