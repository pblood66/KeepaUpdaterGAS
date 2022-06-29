function averageAtInterval(arr, startDate, endDate) {
   var startIndex = findNearIndex(arr, startDate);
   var endIndex = findNearIndex(arr, endDate) + 2;
   var intervalArr = arr.slice(startIndex, endIndex);
   console.log(intervalArr)

   return averageKeepaPrices(intervalArr);
}

function averageKeepaPrices(priceArr) {
   var sum = 0;

   for (let i = 0; i < priceArr.length / 2; ++i) {
      if (priceArr[(i * 2) + 1] == -1) {
         continue;
      }
      sum += priceArr[(i * 2) + 1];
   }

   return sum / (priceArr.length / 2);
}

