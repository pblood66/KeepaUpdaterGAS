function averageAtInterval(priceArr) {
   var sum = 0;

   for (let i = 0; i < priceArr.length / 2; ++i) {
      if (priceArr[(i * 2) + 1] == -1) {
         continue;
      }
      sum += priceArr[(i * 2) + 1];
   }

   return sum / (priceArr.length / 2);
}


console.log(averageAtInterval([1, 2, 3, 4, 5, 6, 7, 8]));