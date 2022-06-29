function test() {
  var product = fetchProduct("B00IYFB8VI", getFirstDate(), getEndDate());

  Logger.log(product.startDate)
  Logger.log(product.endDate)
  Logger.log(product.avgAmazonAtInterval)
  Logger.log(product.avgSalesRankAtInterval)
}
