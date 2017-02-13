class Car(object):
    def __init__(self, price, speed, fuel, mileage):
        self.price = price
        self.speed = speed
        self.fuel = fuel
        self.mileage = mileage
        self.tax = 0.12 if price <= 10000 else 0.15

    def display_all(self):
        print "Price: {}\nSpeed: {}mph\nFuel: {}\nMileage: {}mpg\nTax: {}\n".format(self.price, self.speed, self.fuel, self.mileage, self.tax)

cars = []
cars.append(Car(2000,35,'Full',15))
cars.append(Car(2000,5,'Not Full',105))
cars.append(Car(2000,15,'Kind of Full',95))
cars.append(Car(2000,25,'Full',25))
cars.append(Car(2000,45,'Empty',25))
cars.append(Car(20000000,35,'Empty',15))

[car.display_all() for car in cars]
