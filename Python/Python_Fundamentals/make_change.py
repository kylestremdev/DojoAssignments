def change(cents):
    coins = {}
    coins["dollars"] = cents / 100
    cents %= 100
    coins["half-dollars"] = cents / 50
    cents %= 50
    coins["quarters"] = cents / 25
    cents %= 25
    coins["dimes"] = cents / 10
    cents %= 10
    coins["nickles"] = cents / 5
    cents %= 5
    coins["pennies"] = cents
    return coins
