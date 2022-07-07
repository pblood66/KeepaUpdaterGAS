class Product {
  constructor(data, startDate, endDate) {
    this.startDate = convertToKeepaMin(startDate);
    this.endDate = convertToKeepaMin(endDate);

    // Basic Product Values
    this.title = data['title'];
    this.asin = data['asin'];
    this._eanList = data['eanList'];
    this._upcList = data['upcList'];
    this.parentAsin = data['parentAsin'];
    this.description = data['description'];
    this._amazonAvailability = data['availabilityAmazon'];
    this._amazonDelay = data['availabilityAmazonDelay'];

    // Item Details
    this.manufacturer = data['manufacturer'];
    this.brand = data['brand'];
    this.productGroup = data['productGroup'];
    this.partNumber = data['partNumber'];
    this.releaseDate = data['releaseDate'];
    this.languages = data['languages'];
    this.model = data['model'];
    this.color = data['color'];
    this.size = data['size'];
    this.edition = data['edition'];
    this.format = data['format'];
    this.features = data['features'];
    this.isAdultProduct = data['isAdultProduct'];

    this._packageDimensions = new Dimensions(data['packageHeight'],
      data['packageLength'], data['packageWidth'],
      data['packageWeight'], data['packageQuantity']);
    this._itemDimensions = new Dimensions(data['itemHeight'],
      data['itemLength'], data['itemWidth'],
      data['itemWeight'], data['itemQuantity']);

    // Category values
    this._rootCategory = data['rootCategory'];
    this._categoryTree = data['categoryTree'];

    // Updates Times
    this.trackingSince = convertToDate(data['trackingSince']);
    this.lastUpdate = convertToDate(data['lastUpdate']);
    this.lastRatingUpdate = convertToDate(data['lastRatingUpdate']);
    this.lastPriceChange = convertToDate(data['lastPriceChange']);
    this.lastEbayUpdate = data['lastEbayUpdate'];

    // 2D Price Array Objects 
    this.min = new Prices(data['stats']['min']);
    this.max = new Prices(data['stats']['max']);
    this.history = new Prices(data['csv']);

    // 1D Price Array Objects
    this.minAtInterval = new Prices(data['stats']['minInInterval']);
    this.maxAtInterval = new Prices(data['stats']['maxInInterval']);
    this.atInterval = new Prices(data['stats']['atIntervalStart']);
    this.current = new Prices(data['stats']['current']);
    this.avg = new Prices(data['stats']['avg']);
    this.avg30 = new Prices(data['stats']['avg30']);
    this.avg90 = new Prices(data['stats'['avg90']]);
    this.avg180 = new Prices(data['stats']['avg180']);

    this.imagesCSV = data['imagesCSV'];
    this.frequentlyBoughtTogether = data['frequentlyBoughtTogether'];
    this.itemVariations = data['variations'];

    this.rankDrop30 = data['stats']['salesRankDrops30'];
    this.rankDrop90 = data['stats']['salesRankDrops90'];
    this.rankDrop180 = data['stats']['salesRankDrops180'];
  }

  get collectibleCountAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let count = this.toPriceDate(this.history.collectibleCount);
    let countInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    for (let i = 0; i < inStock.length; ++i) {
      countInStock.push(this.historyInterval(count, inStock[i]));
    }

    average = this.averageArray(countInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average;
  }

  get fbmPriceAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let price = this.toPriceDate(this.history.collectible);
    let priceInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    price.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      priceInStock.push(this.historyInterval(price, inStock[i]));
    }

    average = this.averageArray(priceInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average / 100;
  }

  get collectibleAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let price = this.toPriceDate(this.history.collectible);
    let priceInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    price.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      priceInStock.push(this.historyInterval(price, inStock[i]));
    }

    average = this.averageArray(priceInStock);
    
    if (isNaN(average)) {
      return -1;
    }

    return average / 100;
  }

  get salesRankAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let rank = this.toPriceDate(this.history.salesRank);
    let rankInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    rank.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      rankInStock.push(this.historyInterval(rank, inStock[i]));
    }

    average = this.averageArray(rankInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average;
  }

  get listPriceAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let price = this.toPriceDate(this.history.listPrice);
    let priceInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    price.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      priceInStock.push(this.historyInterval(price, inStock[i]));
    }

    average = this.averageArray(priceInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average / 100;
  }

  get amazonPriceAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let price = this.toPriceDate(this.history.amazonPrice);
    let priceInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    price.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      priceInStock.push(this.historyInterval(price, inStock[i]));
    }

    average = this.averageArray(priceInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average / 100;
  }

  get newPriceAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let price = this.toPriceDate(this.history.newPrice);
    let priceInStock = [];
    let average = 0;

    if (inStock == -1) {
      return -1;
    }

    price.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      priceInStock.push(this.historyInterval(price, inStock[i]));
    }

    average = this.averageArray(priceInStock);

    if (isNaN(average)) {
      return -1;
    }

    return average / 100;
  }

  get newCountAverageInStockInterval() {
    let inStock = this.trimInStock(this.inStock());
    let count = this.toPriceDate(this.history.newCount);
    let countInStock = [];
    let average = 0;


    if (inStock == -1) {
      return -1;
    }

    //sort by date just in case it's unsorted (should already be sorted) ¯\_(ツ)_/¯ 
    count.sort((a,b) => a.keepaMins - b.keepaMins);

    for (let i = 0; i < inStock.length; ++i) {
      countInStock.push(this.historyInterval(count, inStock[i]));
    }
    
    average = this.averageArray(countInStock);
    
    if (isNaN(average)) {
      return -1;
    }

    return average;
  }

  /**
  * Finds index for a price array of PriceDate objects based on date value
  *
  * @param {Array} priceArr a price Array of PriceDate objects
  * @param {Number} keepaMin timestamp in keepa minutes
  * @return {Number} index of price array 
  */
  findIndex(priceArr, keepaMin) {
    // if first index greater than value
    if (priceArr[0].keepaMins > keepaMin) {
        return 0;
    }
    // if last index less than value
    if (priceArr[priceArr.length - 1].keepaMins < keepaMin) {
      return -1;
    }

    for (let i = 0; i < priceArr.length; ++i) { 
      // case is between values
      if (priceArr[i].keepaMins <= keepaMin && priceArr[i + 1].keepaMins > keepaMin) {
        return i;
      }
    }
    //value not found
    return -1;
  }

  /**
  * Converts from [date, price, date, price...] format to PriceDate objects
  *
  * @param {Array} priceArr array of alternating timestamps and price 
  * @return {Array} array of PriceDate objects 
  */
  toPriceDate(priceArr) {
    let priceDateArr = [];

    for (let i = 0; i < priceArr.length / 2; ++i) {
      priceDateArr.push(new PriceDate(priceArr[i * 2], priceArr[(i * 2) + 1]));
    }

    return priceDateArr;
  }

  /**
  * Averages the price property of a 2 dimensional array of PriceDate objects
  * 1st dimension is for each StockRange object
  * 2nd dimension is all PriceDate objects that fall within the StockRange object
  *
  * @param {Array} arr 2D array of PriceDate objects
  * @return {Number} average of the price property of arr
  */
  averageArray(arr) {
    let sum = 0;
    let numTerms = 0;

    for (let range in arr) {
      for (let term in arr[range]) {
        if (arr[range][term].price == null) {
          continue;
        }
        sum += arr[range][term].price;
        ++numTerms;
      }
    }

    return sum / numTerms;
  }


  /**
  * Gets values within range of a single date range object
  *
  * @param {Array} priceList array of PriceDate objects
  * @param {Object} stockRange a StockRange object with a start and end date
  * @return {Array} array of PriceDate objects that fall within stockRange
  */
  historyInterval(priceList, stockRange) {
    let startIndex = this.findIndex(priceList, stockRange.start);
    let endIndex = this.findIndex(priceList, stockRange.end) + 1; // + 1 to account for array slicing

    return priceList.slice(startIndex, endIndex);
  }

  /**
  * finds index of inStock StockRange objects by start date value
  *
  * @param {Array} inStock array of StockRange objects
  * @param {Number} keepaMins timestamp in keepa minutes
  * @return {Number} index in inStock based on keepaMins
  */
  findInStockIndex(inStock, keepaMins) {
    for (let i in inStock) {
      if (inStock[i].start >= keepaMins) {
        return i;
      }
    }
    if (inStock[inStock.length - 1].start < keepaMins) {
      return inStock.length - 1;
    }
    return 0;
  }

  /**
  * Trims inStock array to the product date range
  *
  * @param {Array} inStock array of PriceDate objects over the entire lifetime of the product
  * @return {Array} array of PriceDate objects from the range of startDate to endDate
  */
  trimInStock(inStock) {
    return inStock.slice(this.findInStockIndex(inStock, this.startDate), this.findInStockIndex(inStock, this.endDate))
  }

  /**
  * Gets ranges when product is in stock over it's entire lifetime
  *
  * @return {Array} array of date range objects where the product is in stock at amazon
  */
  inStock() {
    let inStock = [];
    let startDate = -1;
    let endDate = -1;
    let amazon = this.history.amazonPrice;
                 
    for (let i = 0; i < amazon.length; ++i) {
      // skip all date values
      if (i % 2 == 0) {
        continue;
      }
      // skip non null prices unless startDate is -1
      if (amazon[i] != -1) {
        if (startDate == -1) { // start of a new range
          startDate = amazon[i - 1];
        }
        continue;
      }
      else {
        if (startDate == -1) { // skip any null values after initial null value
          continue;
        }
        // first null value means that it's the end of range
        endDate = amazon[i - 1];
        inStock.push(new StockRange(startDate, endDate));
        startDate = -1;
      }
    }

    return inStock;
  }

  get avgAmazonAtInterval() {
    return parseFloat(averageAtInterval(this.history.amazonPrice, this.startDate, this.endDate)) / 100;
  }

  get avgNewAtInterval() {
    return parseFloat(averageAtInterval(this.history.newPrice, this.startDate, this.endDate)) / 100;
  }

  get avgSalesRankAtInterval() {
    return parseInt(averageAtInterval(this.history.salesRank, this.startDate, this.endDate));
  }

  get avgListPriceAtInterval() {
    return parseFloat(averageAtInterval(this.history.listPrice, this.startDate, this.endDate)) / 100;
  }

  get avgCollectibleAtInterval() {
    return parseFloat(averageAtInterval(this.history.collectible, this.startDate, this.endDate)) / 100;
  }

  get avgFbmPriceAtInterval() {
    return parseFloat(averageAtInterval(this.history.fbmPrice, this.startDate, this.endDate)) / 100;
  }

  get avgLightningAtInterval() {
    return parseFloat(averageAtInterval(this.history.lightningDeal, this.startDate, this.endDate)) / 100;
  }

  get avgWarehouseAtInterval() {
    return parseFloat(averageAtInterval(this.history.warehouse, this.startDate, this.endDate)) / 100;
  }

  get avgFbaPriceAtInterval() {
    return parseFloat(averageAtInterval(this.history.fba, this.startDate, this.endDate)) / 100;
  }

  get avgNewCountAtInterval() {
    return parseFloat(averageAtInterval(this.history.amazonPrice, this.startDate, this.endDate)) / 100;
  }

  get avgCollectibleCountAtInterval() {
    return parseFloat(averageAtInterval(this.history.collectibleCount, this.startDate, this.endDate)) / 100;
  }

  get avgRatingAtInterval() {
    return parseFloat(averageAtInterval(this.history.rating, this.startDate, this.endDate)) / 100;
  }

  get avgReviewCountAtInterval() {
    return parseFloat(averageAtInterval(this.history.reviewCount, this.startDate, this.endDate)) / 100;
  }

  get avgTradeInAtInterval() {
    return parseFloat(averageAtInterval(this.history.tradeIn, this.startDate, this.endDate)) / 100;
  }

  get avgRentalAtInterval() {
    return parseFloat(averageAtInterval(this.history.rental, this.startDate, this.endDate)) / 100;
  }

  get firstAmazonStock() {
    var amazon = this.history.amazonPrice;
    var placeholderIndex = -1;
    for (let i = 0; i < amazon.length / 2; ++i) {
      if (amazon[(i * 2) + 1] != -1) {
        Logger.log(amazon[i * 2 + 1])
        placeholderIndex = i * 2;
        break;
      }
    }

    if (placeholderIndex != -1) {
      return convertToDate(amazon[placeholderIndex]);
    }
    else {
      console.log("no date")
      return "";
    }
  }

  get lastInStockDate() {
    var placeholderIndex = 0;

    var amazon = this.history.amazonPrice;
    for (let i = 0; i < amazon.length / 2; ++i) {
      if (amazon[(i * 2) + 1] != -1) {
        placeholderIndex = i * 2 + 1;
      }
    }
    if (placeholderIndex) {
      return convertToDate(amazon[placeholderIndex - 1]);
    }
    else {
      console.log("no date")
      return "";
    }
  }

  get availabilityDelay() {
    if (this._amazonDelay == null) {
      return "No delay"
    }

    start = this._amazonDelay[0] / 24;
    end = this._amazonDelay[1] / 24;

    return "Available to ship in " + start + "-" + end + " days"
  }

  get category() {
    for (let i = 0; i < this._categoryTree.length; ++i) {
      if (this._categoryTree[i]['catId'] == this._rootCategory) {
        return this._categoryTree[i]['name'];
      }
    }
  }

  get price() {
    if (this.current.amazonPrice != -1) {
      return this.current.amazonPrice / 100;
    }
    else {
      return this.current.newPrice / 100;
    }
  }

  get availability() {
    switch (this._amazonAvailability) {
      case -1:
        return "No Amazon offer available";
        break;
      case 0:
        return "In stock";
        break;
      case 1:
        return "Not in stock (pre-order)";
        break;
      case 2:
        return "Availability Unknown";
        break;
      case 3:
        return "Not in stock (back-order)";
        break;
      case 4:
        return "Shipping delayed";
        break;
    }
  }

  get salesRank() { return this.current.salesRank; }
  get rating() { return this.current.rating; }
  get countReviews() { return this.current.reviewCount; }

  get productDimensions() { return this._productDimensions.toString(); }
  get itemDimensions() { return this._itemDimensions.toString(); }
  get ean() {
    if (this._eanList == null) {
      return 0;
    }
    return this._eanList[0];
  }
  get upc() {
    if (this._upcList == null) {
      return 0;
    }
    return this._upcList[0];
  }

  get minAmazonPrice() { return this.min.amazonPrice[1] / 100; }
  get maxAmazonPrice() { return this.max.amazonPrice[1] / 100; }
  get minNewPrice() { return this.min.newPrice[1] / 100; }
  get maxNewPrice() { return this.max.newPrice[1] / 100; }
  get minSalesRank() { return this.min.salesRank[1]; }
  get maxSalesRank() { return this.max.salesRank[1]; }
  get minListPrice() { return this.min.listPrice[1] / 100; }
  get maxListPrice() { return this.max.listPrice[1] / 100; }
  get minCollectiblePrice() { return this.min.collectible[1] / 100; }
  get maxCollectiblePrice() { return this.max.collectible[1] / 100; }
  get minFbmPrice() { return this.min.fbm[1] / 100; }
  get maxFbmPrice() { return this.max.fbm[1] / 100; }
  get minLightningDealPrice() { return this.min.lightningDeal[1] / 100; }
  get maxLightningDealPrice() { return this.max.lightningDeal[1] / 100; }
  get minWarehousePrice() { return this.min.warehouse[1] / 100; }
  get maxWarehousePrice() { return this.max.warehouse[1] / 100; }
  get minFbaPrice() { return this.min.fba[1] / 100; }
  get maxFbaPrice() { return this.max.fba[1] / 100; }
  get minNewCount() { return this.min.newCount[1]; }
  get maxNewCount() { return this.max.newCount[1]; }
  get minCollectibleCount() { return this.min.collectibleCount[1]; }
  get maxCollectibleCount() { return this.max.collectibleCount[1]; }
  get minRating() { return this.min.rating[1]; }
  get maxRating() { return this.max.rating[1]; }
  get minReviewCount() { return this.min.reviewCount[1]; }
  get maxReviewCount() { return this.max.reviewCount[1]; }
  get minTradeInPrice() { return this.min.tradeIn[1] / 100; }
  get maxTradeInPrice() { return this.max.tradeIn[1] / 100; }
  get minRentalPrice() { return this.min.rental[1] / 100; }
  get maxRentalPrice() { return this.max.rental[1] / 100; }

  get minAmazonPriceAtInterval() { return this.minAtInterval.amazonPrice[1] / 100; }
  get maxAmazonPriceAtInterval() { return this.maxAtInterval.amazonPrice[1] / 100; }
  get minNewPriceAtInterval() { return this.minAtInterval.newPrice[1] / 100; }
  get maxNewPriceAtInterval() { return this.maxAtInterval.newPrice[1] / 100; }
  get minSalesRankAtInterval() { return this.minAtInterval.salesRank; }
  get maxSalesRankAtInterval() { return this.maxAtInterval.salesRank; }
  get minListPriceAtInterval() { return this.minAtInterval.listPrice[1] / 100; }
  get maxListPriceAtInterval() { return this.maxAtInterval.listPrice[1] / 100; }
  get minCollectiblePriceAtInterval() { return this.minAtInterval.collectible[1] / 100; }
  get maxCollectiblePriceAtInterval() { return this.maxAtInterval.collectible[1] / 100; }
  get minFbmPriceAtInterval() { return this.minAtInterval.fbm[1] / 100; }
  get maxFbmPriceAtInterval() { return this.maxAtInterval.fbm[1] / 100; }
  get minLightningDealPriceAtInterval() { return this.minAtInterval.lightningDeal[1] / 100; }
  get maxLightningDealPriceAtInterval() { return this.maxAtInterval.lightningDeal[1] / 100; }
  get minWarehousePriceAtInterval() { return this.minAtInterval.warehouse[1] / 100; }
  get maxWarehousePriceAtInterval() { return this.maxAtInterval.warehouse[1] / 100; }
  get minFbaPriceAtInterval() { return this.minAtInterval.fba[1] / 100; }
  get maxFbaPriceAtInterval() { return this.maxAtInterval.fba[1] / 100; }
  get minNewCountAtInterval() { return this.minAtInterval.newCount; }
  get maxNewCountAtInterval() { return this.maxAtInterval.newCount; }
  get minCollectibleCountAtInterval() { return this.minAtInterval.collectibleCount; }
  get maxCollectibleCountAtInterval() { return this.maxAtInterval.collectibleCount; }
  get minRatingAtInterval() { return this.minAtInterval.rating; }
  get maxRatingAtInterval() { return this.maxAtInterval.rating; }
  get minReviewCountAtInterval() { return this.minAtInterval.reviewCount; }
  get maxReviewCountAtInterval() { return this.maxAtInterval.reviewCount; }
  get minTradeInPriceAtInterval() { return this.minAtInterval.tradeIn[1] / 100; }
  get maxTradeInPriceAtInterval() { return this.maxAtInterval.tradeIn[1] / 100; }
  get minRentalPriceAtInterval() { return this.minAtInterval.rental[1] / 100; }
  get maxRentalPriceAtInterval() { return this.maxAtInterval.rental[1] / 100; }

  get amazonPriceAtDate() { return this.atInterval.amazonPrice / 100; }
  get newPriceAtDate() { return this.atInterval.newPrice / 100; }
  get salesRankAtDate() { return this.atInterval.salesRank; }
  get listPriceAtDate() { return this.atInterval.listPrice / 100; }
  get collectiblePriceAtDate() { return this.atInterval.collectible / 100; }
  get fbmPriceAtDate() { return this.atInterval.fbm / 100; }
  get lightningDealAtDate() { return this.atInterval.lightningDeal / 100; }
  get warehousepriceAtDate() { return this.atInterval.warehouse / 100; }
  get fbaPriceAtDate() { return this.atInterval.fba / 100; }
  get newCountAtDate() { return this.atInterval.newCount; }
  get collectibleCountAtDate() { return this.atInterval.collectible; }
  get ratingAtDate() { return this.atInterval.rating; }
  get reviewCountAtDate() { return this.atInterval.reviewCount; }
  get tradeInPriceAtDate() { return this.atInterval.tradeIn / 100; }
  get rentalPriceAtDate() { return this.atInterval.rental / 100; }

  get avgAmazonPrice() { return this.avg.amazonPrice / 100; }
  get avg30AmazonPrice() { return this.avg30.amazonPrice / 100; }
  get avg90AmazonPrice() { return this.avg90.amazonPrice / 100; }
  get avg180AmazonPrice() { return this.avg180.amazonPrice / 100; }
  get avgNewPrice() { return this.avg.newPrice / 100; }
  get avg30NewPrice() { return this.avg30.newPrice / 100; }
  get avg90NewPrice() { return this.avg90.newPrice / 100; }
  get avg180NewPrice() { return this.avg180.newPrice / 100; }
  get avgSalesRank() { return this.avg.salesRank; }
  get avg30SalesRank() { return this.avg30.salesRank; }
  get avg90SalesRank() { return this.avg90.salesRank; }
  get avg180SalesRank() { return this.avg180.salesRank; }
  get avgListPrice() { return this.avg.listPrice / 100; }
  get avg30ListPrice() { return this.avg30.listPrice / 100; }
  get avg90ListPrice() { return this.avg90.listPrice / 100; }
  get avg180ListPrice() { return this.avg180.listPrice / 100; }
  get avgCollectiblePrice() { return this.avg.collectible / 100; }
  get avg30CollectiblePrice() { return this.avg30.collectible / 100; }
  get avg90CollectiblePrice() { return this.avg90.collectible / 100; }
  get avg180CollectiblePrice() { return this.avg180.collectible / 100; }
  get avgFbmPrice() { return this.avg.fbm / 100; }
  get avg30FbmPrice() { return this.avg30.fbm / 100; }
  get avg90FbmPrice() { return this.avg90.fbm / 100; }
  get avg180FbmPrice() { return this.avg180.fbm / 100; }
  get avgLightningDealPrice() { return this.avg.lightningDeal / 100; }
  get avg30LightningDealPrice() { return this.avg30.lightningDeal / 100; }
  get avg90LightningDealPrice() { return this.avg90.lightningDeal / 100; }
  get avg180LightningDealPrice() { return this.avg180.lightningDeal / 100; }
  get avgWarehousePrice() { return this.avg.warehouse / 100; }
  get avg30WarehousePrice() { return this.avg30.warehouse / 100; }
  get avg90WarehousePrice() { return this.avg90.warehouse / 100; }
  get avg180WarehousePrice() { return this.avg180.warehouse / 100; }
  get avgFbaPrice() { return this.avg.fba / 100; }
  get avg30FbaPrice() { return this.avg30.fba / 100; }
  get avg90FbaPrice() { return this.avg90.fba / 100; }
  get avg180FbaPrice() { return this.avg180.fba / 100; }
  get avgNewCount() { return this.avg.newCount; }
  get avg30NewCount() { return this.avg30.newCount; }
  get avg90NewCount() { return this.avg90.newCount; }
  get avg180NewCount() { return this.avg180.newCount; }
  get avgCollectibleCount() { return this.avg.collectibleCount; }
  get avg30CollectibleCount() { return this.avg30.collectibleCount; }
  get avg90CollectibleCount() { return this.avg90.collectibleCount; }
  get avg180CollectibleCount() { return this.avg180.collectibleCount; }
  get avgRating() { return this.avg.rating; }
  get avg30Rating() { return this.avg30.rating; }
  get avg90Rating() { return this.avg90.rating; }
  get avg180Rating() { return this.avg180.rating; }
  get avgReviewCount() { return this.avg.reviewCount; }
  get avg30ReviewCount() { return this.avg30.reviewCount; }
  get avg90ReviewCount() { return this.avg90.reviewCount; }
  get avg180ReviewCount() { return this.avg180.reviewCount; }
  get avgTradeInPrice() { return this.avg.tradeIn / 100; }
  get avg30TradeInPrice() { return this.avg30.tradeIn / 100; }
  get avg90TradeInPrice() { return this.avg90.tradeIn / 100; }
  get avg180TradeInPrice() { return this.avg180.tradeIn / 100; }
  get avgRentalPrice() { return this.avg.rental / 100; }
  get avg30RentalPrice() { return this.avg30.rental / 100; }
  get avg90RentalPrice() { return this.avg90.rental / 100; }
  get avg180RentalPrice() { return this.avg180.rental / 100; }
}

class StockRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class PriceDate {
  constructor(keepaMinutes, price) {
    this.price = price;
    this.keepaMins = keepaMinutes;
  }
}

class Dimensions {
  constructor(height, length, width, weight, quantity) {
    this.height = height;
    this.length = length;
    this.width = width;
    this.weight = weight;
    this.quantity = quantity;
  }

  toString() {
    return this.length + "mm x " + this.width + "mm x " + this.height + "mm " + this.weight + "g"
  }
}

class Prices {
  constructor(priceArray) {
    this.priceArray = priceArray;
  }

  get amazonPrice() {
    return this.priceArray[0];
  }

  get newPrice() {
    return this.priceArray[1];
  }
  
  get salesRank() {
    return this.priceArray[3];
  }
    
  get listPrice() {
    return this.priceArray[4];

  }

  get collectible() {
    return this.priceArray[5];
  }

  get fbmPrice() {
    return this.priceArray[7];
  }

  get lightningDeal() {
    return this.priceArray[8];
  }

  get warehouse() {
    return this.priceArray[9];
  }

  get fba() {
    return this.priceArray[10];
  }

  get newCount() {
    return this.priceArray[11];
  }

  get collectibleCount() {
    return this.priceArray[14];
  }

  get rating() {
    return this.priceArray[16] / 10;
  }
    
  get reviewCount() {
    return this.priceArray[17];
  }

  get tradeIn() {
    return this.priceArray[30];
  }

  get rental() {
    return this.priceArray[31];
  }
}

