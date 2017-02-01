function sumToOne(num) {
  while ((num / 10) >= 1) {
    var placeholder = num;
    var sum = 0;
    var i = 1;
    while ((num / Math.pow(10, i)) > 0.1) {
      var val = (placeholder % Math.pow(10, i));
      var digit = val / Math.pow(10, (i - 1));
      placeholder -= val;
      sum += digit;
      i++;
    }
    num = sum;
  }
  return num;
}

console.log(sumToOne(347));
