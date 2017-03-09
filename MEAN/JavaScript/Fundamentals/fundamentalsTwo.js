// 1
function sumXtoY(x, y){
  var sum = 0
  for (var i = x; i <= y; i++){
    sum += i;
  }
  console.log(sum);
}

// 2
function findMin(arr){
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

// 3
function findAvg(arr) {
  var sum = arr[0];
  for (var i = 1; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum/arr.length;
}

// 4
var anonSumXtoY = function (x,y) {
  var sum = 0
  for (var i = x; i <= y; i++){
    sum += i;
  }
  console.log(sum);
}

var anonFindMin = function (arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

var anonFindAvg = function (arr) {
  var sum = arr[0];
  for (var i = 1; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum/arr.length;
}

var functionObj = {
  findAvg: anonFindAvg,
  findMin : anonFindMin,
  sumXtoY : anonSumXtoY
};

var person = {
  name: "Kyle",
  distance_traveled: 0,
  say_name: function () {
    console.log(this.name);
  },
  say_something: function (str) {
    console.log(this.name, str);
  },
  walk: function () {
    console.log(this.name, "is walking");
    this.distance_traveled += 3;
  },
  run: function () {
    console.log(this.name, "is running");
    this.distance_traveled += 10;
  },
  crawl: function () {
    console.log(this.name, "is crawling");
    this.distance_traveled += 1;
  }
}
