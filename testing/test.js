function test() {
  var product = fetchProduct("B083W22G83", "2017-04-17", "2023-05-12");

  Logger.log(product.startDate);
  Logger.log(product.endDate);

  var arr = product.newCountAverageInStockInterval;
  Logger.log(arr)
  

}
