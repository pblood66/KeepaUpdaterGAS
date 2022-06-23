
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
