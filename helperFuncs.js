/**
 * Finds the index of compVal if compVal was inserted and sorted into the priceArray
 * Since date values will not be exact, exact indices are rare
 * 
 * @param {Array} priceArray price date array
 * @param {any} compVal value to compare the date values with
 * @returns index at which compVal would be around
 */

function findNearIndex(priceArray, compVal) {

  // if first index greater than value
  if (parseInt(priceArray[0]) > compVal) {
    return 0;
  }
  // if last index less than value
  if (parseInt(priceArray[priceArray.length - 1]) < compVal) {
    return priceArray.length - 1;
  }

  for (let i = 0; i < priceArray.length; ++i) {
    if (i % 2 == 1) {
      continue;
    }
    // case is between values
    if (priceArray[i] <= compVal && priceArray[i + 2] > compVal) {
      return i;
    }
  }
  //value not found
  return priceArray.length - 1;
}

/**
 * finds indices of an array
 * !depracated
 * 
 * @param {Array} arr 
 * @param {Number} val 
 * @returns array of indices with a certain value
 */
function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++)
    if (arr[i] === val)
      indexes.push(i);
  return indexes;
}

/**
 * finds all indices of a particular value in an array
 * 
 * @param {any} compVal 
 * @returns an array with the indices of all compVal
 */
Array.prototype.findAll = function (compVal) {
  var indices = [], i = 0;
  for (i; i < this.length; i++) {
    if (this[i] === compVal) {
      indices.push(i);
    }
  }
  return indices;
}


/**
 * updates entire product
 * 
 * 
 * @param {Number} row row number
 * @param {Number} col column to start at
 * @param {Object} product Product object
 * @param {Array} settings array of settings
 * @return {void}  
 */
function updateRow(row, column, product, settings) {
  var sheet = ss.getActiveSheet();

  if (product == 0) {
    updateCell(row, column + 1, "Invalid ASIN", sheet);
    return;
  }
  Logger.log(product.asin)

  for (let i = 0; i < settings.length / 2; i++) {
    if (settings[(i * 2) + 1]) {
      let currCol = column + i;
      try {
        let value = product[settings[i * 2]];
        Logger.log(`${settings[i * 2]}: ${value}`)
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
  if (data < 0 || data == null || data == "NaN") {
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