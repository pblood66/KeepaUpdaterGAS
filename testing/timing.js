function startElapsedTime() {
  return Date.now();
}

function endElapsedTime(startTime) {
  var endTime = Date.now();
  var elapsedTime = endTime - startTime;

  elapsedTime /= 1000;
  return elapsedTime;
}