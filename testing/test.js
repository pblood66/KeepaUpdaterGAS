function test() {
  var product = fetchProduct("B083W22G83", "2019-01-17", "2021-05-12");

  Logger.log(product.startDate);
  Logger.log(product.endDate);

  var arr = product["newCountAverageInStockInterval"];
  Logger.log(arr)
  

}
