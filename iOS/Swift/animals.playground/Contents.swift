//: Playground - noun: a place where people can play

import UIKit

class Animal {
    let name: String
    var health: Int = 100
    
    init(name: String) {
        self.name = name
    }
    
    func displayHealth() -> () {
        print(self.health)
    }
}

class Cat: Animal {
    override init(name: String){
        super.init(name: name)
        self.health = 150
    }
    
    func growl() -> () {
        print("Rawr!")
    }
    
    func run() -> () {
        if self.health != 0 {
            print("Running")
            self.health -= 10
        }
    }
}

class Lion: Cat {
    override init(name: String) {
        super.init(name: name)
        self.health = 200
    }
    
    override func growl() -> () {
        print("ROAR!!!! I am the king of the Jungle")
    }
}

class Cheetah: Cat {
    override func run() -> () {
        print("Running Fast")
        self.health -= 50
    }
    
    func sleep () -> () {
        if health != 150 {
            self.health += 50
        }
    }
}

var lion = Lion(name: "Patrick")

lion.run()
lion.run()
lion.run()
lion.growl()

print(lion.health)