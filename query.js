/**
 * Builds and encodes URL
 * 
 * @param {Object} key: query, value: value
 * @return {String} encoded url endpoint 
 */
String.prototype.addQuery = function (obj) {
  return this + Object.keys(obj).reduce(function (prev, curr, index) {
    return prev + (index == 0 ? "?" : "&") + curr + "=" + encodeURIComponent(obj[curr]);
  }, "");
}


/**
 * Retrieves url endpoint for a Token request
 * 
 * @return {String} encoded url endpoint 
 */
function getTokenURL() {
  var url = "https://api.keepa.com/token";
  var query = {
    key: retrieveKey(),
  };
  var endpoint = url.addQuery(query);
  return endpoint;
}


/**
 * Retrieves url endpoint for a product request
 * 
 * @param {String} product asin
 * @param {String} Interval dates ISO8601 UTC
 * @return {String} encoded url endpoint 
 */
function getProductURL(asin, date) {
  var url = "https://api.keepa.com/product";
  var query = {
    key: retrieveKey(),
    domain: 1,
    asin: asin,
    stats: date,
  };

  var endpoint = url.addQuery(query);
  return endpoint;
}

/**
 * Fetches user token data
 * 
 * @return {Object} keepa token data
 */
function checkTokens() {
  url = getTokenURL();
  response = UrlFetchApp.fetch(url);

  // Parse as a JSON object
  data = JSON.parse(response.getContentText());

  return data;
}

function fetchBatchProduct(asins, startDate, endDate) {
  let date = startDate + "," + endDate;

  var url = getProductURL(asins, date);
  var response = UrlFetchApp.fetch(url);
  var data = JSON.parse(response.getContentText())
  var products = []

  for (let product of data.products) {
    let currProduct = new Product(product, startDate, endDate);
    products.push(currProduct);
  }

  return products
}

/**
 * Fetches product data from Keepa
 *
 * @param {String} Asin of the product
 * @param {String} Interval dates ISO8601 UTC
 * @return {Object} Product Object
 */

function fetchProduct(asin, startDate, endDate) {
  var time, data;

  time = startDate + "," + endDate
  Logger.log(time)

  var url = getProductURL(asin, time);
  var response = UrlFetchApp.fetch(url);

  // parse and convert to a JSON object
  
  var data = JSON.parse(response.getContentText());
  Logger.log(data)

  // return the product as a JSON object
  var currProduct = new Product(data.products[0], startDate, endDate);

  return currProduct;
}