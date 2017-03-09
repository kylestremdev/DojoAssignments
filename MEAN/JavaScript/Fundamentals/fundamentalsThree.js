function Person(name) {
  var name = name;
  var distance_traveled = 0;

  var add_to_distance_traveled = function (x) {
    distance_traveled += x;
  }

  this.get_distance_traveled = function () {
    return distance_traveled;
  };

  this.set_name = function (new_name) {
    name = new_name;
  };

  this.say_name = function () {
    console.log(name);
  };

  this.say_something = function (something) {
    console.log(name, "says", something);
  };

  this.walk = function () {
    console.log(name, "is walking");
    add_to_distance_traveled(3);
  };

  this.run = function () {
    console.log(name, "is running");
    add_to_distance_traveled(10);
  };

  this.crawl = function () {
    console.log(name, "is crawling");
    add_to_distance_traveled(1);
  }
}

Person.prototype.change_name = function (name) {
  this.set_name(name);
}

function personFactory(name) {
  return new Person(name);
}

var jay = personFactory("Jay");

console.log(jay);
jay.say_name();
jay.walk();
console.log(jay.get_distance_traveled());
console.log(jay.add_to_distance_traveled)


function Ninja(name, cohort) {
  this.name = name;
  this.cohort = cohort;
  this.beltLevel = "yellow";


}
