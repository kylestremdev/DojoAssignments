function VehicleConstructor(name, num_wheels, num_passengers) {
  this.name = name;
  this.num_wheels = num_wheels;
  this.num_passengers = num_passengers;

  this.makeNoise = function () {
    console.log("User your blinker asshole");
  }
}

var Bike = new VehicleConstructor("Bike", 2, 1);
Bike.makeNoise = function () {
  console.log("ring ring");
}

var Sedan = new VehicleConstructor("Sedan", 4, 5);
Sedan.makeNoise = function () {
  console.log("Honk Honk!");
}

var Bus = new VehicleConstructor("Bus", 4, 10);
Bus.pick_up = function (x) {
  this.num_passengers += x;
}
