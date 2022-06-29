function averageAtInterval(arr, startDate, endDate) {
   Logger.log(arr)
   var startIndex = findNearIndex(arr, startDate);
   var endIndex = findNearIndex(arr, endDate) + 2;

   Logger.log(`start: ${startIndex} end: ${endIndex}`)
   var intervalArr = arr.slice(startIndex, endIndex);
   Logger.log(intervalArr)

   return averageKeepaPrices(intervalArr);
}

function averageKeepaPrices(priceArr) {
   var sum = 0;
   var sumTerms = 0;

   for (let i = 0; i < priceArr.length / 2; ++i) {
      if (priceArr[(i * 2) + 1] == -1) {
         continue;
      }
      sum += priceArr[(i * 2) + 1];
      ++sumTerms
   }

   return sum / sumTerms;
}

