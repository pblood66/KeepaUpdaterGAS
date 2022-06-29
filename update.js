function updateSheetBatches() {
   var sheet = ss.getSheetByName("Products");
   var updateStatus = getUpdateValues();
   var asins = [];
   var rowOffset = 2;
   let row = rowOffset;

   while (getCellValue(row, 1, sheet)) {
      asins.push(getCellValue(row, 1, sheet))
      ++row
   }
   var productStart = startElapsedTime()
   var products = fetchBatchProduct(asins, getFirstDate(), getEndDate());
   Logger.log(`Elapsed Product Time: ${endElapsedTime(productStart)}`);

   for (let i = 0; i < products.length; ++i) {
      updateRow(i + rowOffset, products[i], updateStatus);
      Logger.log(`Updated ${products[i].asin}`)
   }
   refreshToken();
}

function flexibleUpdateProductBatches() {
   var sheet = ss.getSheetByName("Products");
   var selection = ss.getSelection();
   var activeRange = selection.getActiveRange();
   var updateStatus = getUpdateValues();
   var lastRow = activeRange.getLastRow();
   var column = activeRange.getLastColumn();
   var asinColumn = 0;
   var firstRow = lastRow - activeRange.getValues().length + 1;
   var asins = [];
   var currentRow = firstRow;
   Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item);
   };

   var numberBatches = Math.ceil(activeRange.getValues().length / BATCH_SIZE);

   for (let i = 1; i <= column; ++i) {
      if (getCellValue(firstRow, i, sheet).length == 10) {
         asinColumn = i;
      }
   }
   if (asinColumn == column) {
      ++column;
   }

   for (let batch = 0; batch < numberBatches; ++batch) {
      while (currentRow <= lastRow && asins.length < BATCH_SIZE) {
         let asin = getCellValue(currentRow, asinColumn, sheet);
         if (asin.length == 10) {
            asins.push(asin);
         }
         else {
            asins.push(0)
         }
         ++currentRow
      }

      Logger.log(asins);
      var indexes = getAllIndexes(asins, 0);

      var productStart = startElapsedTime()
      var products = fetchBatchProduct(asins, getFirstDate(), getEndDate());
      Logger.log(`Elapsed Product Time: ${endElapsedTime(productStart)}`);

      for (index of indexes) {
         products.insert(index, 0)
      }

      let firstUpdateRow = firstRow + (batch * BATCH_SIZE);

      for (let i = 0; i < products.length; ++i) {
         updateRow(i + firstUpdateRow, column, products[i], updateStatus);
         Logger.log(`Updated ${products[i].asin}`)
      }

      asins = [];
   }

   return;

}


function refreshToken() {
   var token = checkTokens();
   var sheet = ss.getSheetByName("Update Settings");

   Logger.log(`Tokens Left: ${token.tokensLeft}`)
   updateCell(4, 5, token.tokensLeft, sheet);
}


/**
 * Fetches Product Data.
 * Leave queries empty if using checkbox
 * 
 * @param {string} asin product asin.
 * @param {date} startDate First date of interval
 * @param {date} endDate Last date of interval
 * @param {string} queries [Optional] list of product queries 
 * 
 * @return An array of product data values
 * 
 * @customfunction
 */
function GETPRODUCTDATA(asin, startDate, endDate, ...queries) {
   var values = [];
   var date = "";

   var start = new Date(startDate);
   var end = new Date(endDate)

   Logger.log(date)

   Logger.log(asin);
   var product = fetchProduct(asin, start.toISOString(), end.toISOString())

   if (queries.length == 0) {
      settings = getUpdateValues();

      for (let i = 0; i < settings.length / 2; i++) {
         if (settings[(i * 2) + 1]) {
            try {
               if (product[settings[i * 2]] < 0) {
                  values.push("Unavailable");
               }
               else {
                  values.push(product[settings[i * 2]]);
               }
            }
            catch (err) {
               Logger.log(err);
            }
         }
      }

      return [values];
   }


   Logger.log(queries);

   for (let i = 0; i < queries.length; i++) {
      data = product[queries[i]]
      Logger.log(data);
      if (data < 0) {
         values.push("Unavailable");
      }
      else {
         values.push(data);
      }
   }

   return [values];
}


