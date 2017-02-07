import random

heads = 0
tails = 0

for i in range(1, 5001):
    rando = round(random.random())
    coin = ""
    if rando == 0:
        coin = "tails"
        tails += 1
    else:
        coin = "heads"
        heads += 1
    print "Attempt #{}: Throwing... Coin landed {}\n{} total head(s), {} total tail(s)".format(i, coin, heads, tails)

print "Ending program"
