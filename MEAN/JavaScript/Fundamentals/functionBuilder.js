// Task One
function runningLogger() {
  console.log("I am running!")
}

// Task Two
function multiplyByTen(num) {
  num *= 10;
  return num;
}

multiplyByTen(5);

// Task Three
function stringReturnOne() {
  return "Hard coded string one.";
}

function stringReturnTwo() {
  return "Hard coded string two.";
}

// Task Four
function caller(param) {
  if (typeof param == "function") {
    param()
  }
}

// Task Five
function myDoubleConsoleLog(x, y) {
  if (typeof x == 'function' && typeof y == 'function') {
    console.log(x());
    console.log(y());
  }
}

// Task Six
function caller2(a) {
  console.log('starting');
  setTimeout(function () {
    if (typeof a == 'function') {
      a();
    }
    console.log('ending?');
  }, 2000);
  return "interesting";
}

caller2(myDoubleConsoleLog);
