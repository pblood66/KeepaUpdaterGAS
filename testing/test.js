function test() {
  var product = fetchProduct("B007IG0UCW", "2019-03-17", "2021-05-12");
  //Logger.log(findNearIndex(product.history.amazonPrice, product.startDate))
  //Logger.log(findNearIndex(product.history.amazonPrice, product.endDate))
  
  Logger.log(product.startDate);
  Logger.log(product.endDate)
  Logger.log(product.history.amazonPrice)

  Logger.log(product['avgAmazonAtInterval'])
  //Logger.log(product['avgNewAtInterval'])
  //Logger.log(product['avgSalesRankAtInterval'])
  
}
