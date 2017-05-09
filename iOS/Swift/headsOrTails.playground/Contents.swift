//: Playground - noun: a place where people can play

import UIKit

func tossCoin() -> String? {
    let toss: Int = (Int(arc4random_uniform(2)) + 1)
    if toss == 1 {
        return "Heads"
    } else {
        return "Tails"
    }
}

func tossMultipleCoins(num: Int) -> Double {
    var heads: Int = 0
    for _ in 1...num {
        if tossCoin() == "Heads" {
            heads += 1
        }
    }
    return Double(heads) / Double(num)
}

tossMultipleCoins(num: 100)
