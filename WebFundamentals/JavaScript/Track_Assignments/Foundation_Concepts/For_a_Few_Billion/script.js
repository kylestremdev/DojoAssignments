var initial_amount = 0.01;
var sum = 0.01;
var tenThousand = false;
var oneBillion = false;
var infinity= false;
for (var i = 0; i < 1030; i++){
  initial_amount *= 2;
  sum += initial_amount;

  if (i == 29) {
    console.log("Total Reward at day 30:", sum);
  }

  if (sum >= 10000 && tenThousand == false){
    tenThousand = true;
    console.log("Ten thousand on day:", i+1);
  }
  if (sum >= 1000000000 && oneBillion == false){
    oneBillion = true;
    console.log("Billion on day:", i+1);
  }
  if (sum >= Infinity && infinity == false){
    infinity = true;
    console.log("JS Infinity on day:", i+1);
    break;
  }
}

console.log(sum);
