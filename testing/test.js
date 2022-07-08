function test() {
  var product = fetchProduct("B084P6W6NZ", "2019-01-17", "2021-05-12");

  Logger.log(product.startDate);
  Logger.log(product.endDate);

  var inStock = product.newPriceAverageInStockInterval;
  var outStock = product.newPriceAverageOutStockInterval;

  Logger.log(inStock);
  Logger.log(outStock)
  

}
