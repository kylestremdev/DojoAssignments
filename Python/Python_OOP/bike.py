class Bike(object):
    def __init__(self, price, max_speed):
        self.price = price
        self.max_speed = max_speed
        self.miles = 0

    def display_info(self):
        print "Price: {}, Max Speed: {} mph, Total Miles: {}".format(self.price, self.max_speed, self.miles)
        return

    def ride(self):
        print "Riding..."
        self.miles += 10

    def reverse(self):
        print "Reversing..."
        if self.miles >= 5:
            self.miles -= 5


bike1 = Bike(300, 25)
bike1.ride()
bike1.ride()
bike1.ride()
bike1.reverse()
bike1.display_info()

bike2 = Bike(250, 20)
bike2.ride()
bike2.ride()
bike2.reverse()
bike2.reverse()
bike2.display_info()

bike3 = Bike(400, 30)
bike3.reverse()
bike3.reverse()
bike3.reverse()
bike3.display_info()
