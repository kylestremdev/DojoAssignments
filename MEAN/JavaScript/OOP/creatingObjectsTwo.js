function VehicleConstructor(name, num_wheels, num_passengers, speed) {
  var distance_traveled = 0;

  this.name = name;
  this.num_wheels = num_wheels;
  this.num_passengers = num_passengers;
  this.speed = speed;

  this.makeNoise = function () {
    console.log("User your blinker asshole");
  }

  this.move = function () {
    updateDistanceTraveled();
    this.makeNoise();
  }

  this.checkMiles = function () {
    console.log(distance_traveled);
  }

  function updateDistanceTraveled () {
    distance_traveled += speed;
  }
}

var Bike = new VehicleConstructor("Bike", 2, 1, 10);
Bike.makeNoise = function () {
  console.log("ring ring");
}

var Sedan = new VehicleConstructor("Sedan", 4, 5, 50);
Sedan.makeNoise = function () {
  console.log("Honk Honk!");
}

var Bus = new VehicleConstructor("Bus", 4, 10, 35);
Bus.pick_up = function (x) {
  this.num_passengers += x;
}
