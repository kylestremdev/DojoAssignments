//: Playground - noun: a place where people can play

import UIKit

struct Card {
    let value: String
    let suit: String
    let numerical_value: Int
}

extension Card: Equatable {
    static func == (a: Card, b: Card) -> Bool {
        return
            a.value == b.value &&
            a.suit == b.suit
    }
}

extension Card: CustomStringConvertible {
    var description: String{
        return "\(self.value) of \(self.suit)"
    }
}

class Deck {
    var deck: [Card] = [Card]()
    var copy: [Card] = [Card]()
    init() {
        let suits: [String] = ["Clubs", "Spades", "Diamonds", "Hearts"]
        let cards_value: [Int] = [1,2,3,4,5,6,7,8,9,10,11,12,13]
        let cards_name: [String] = ["A", "2","3","4","5","6","7","8","9","10","J","Q","K"]
        for suit in suits {
            for i in 0..<cards_value.count {
                let card = Card(value: cards_name[i], suit: suit, numerical_value: cards_value[i])
                deck.append(card)
            }
        }
        self.copy = self.deck
    }
    
    func deal () -> Card {
        return self.deck.remove(at: 0)
    }
    
    func reset () {
        self.deck = self.copy
    }
    
    func shuffle () {
        for _ in 0...100 {
            let first_index: Int = Int(arc4random_uniform(UInt32(self.deck.count)))
            let second_index: Int = Int(arc4random_uniform(UInt32(self.deck.count)))
            
            let temp: Card = self.deck[first_index]
            self.deck[first_index] = self.deck[second_index]
            self.deck[second_index] = temp
        }
    }
}

class Player {
    let name: String
    var hand: [Card] = [Card]()
    
    init(name: String) {
        self.name = name
    }
    
    func draw(deck: inout Deck) -> Card {
        let card = deck.deal()
        
        self.hand.append(card)
        return card
    }
    
    func discard(card: Card) -> Bool {
        if let inHand = self.hand.index(of: card) {
            self.hand.remove(at: inHand)
            return true
        } else {
            return false
        }
    }
}

var deck = Deck()

var player = Player(name: "Kyle")

print(player.draw(deck: &deck))

