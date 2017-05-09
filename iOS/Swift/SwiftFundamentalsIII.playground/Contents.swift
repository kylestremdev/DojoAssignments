import UIKit

var arrInts: [Int] = [Int]()

for i in 1...255 {
    arrInts.append(i)
}

for i in 0..<arrInts.count {
    var firstIndex: Int = Int(arc4random_uniform(UInt32(255)))
    var secondIndex: Int = Int(arc4random_uniform(UInt32(255)))
    
    var temp: Int = arrInts[firstIndex]
    arrInts[firstIndex] = arrInts[secondIndex]
    arrInts[secondIndex] = temp
}

for i in 0..<arrInts.count {
    if (arrInts[i] == 42) {
        print("We found the answer to the Ultimate Question of Life, the Universe, and Everything at index \(i)")
    }
}