import random
iterations = 1000000

# Make a deck of cards / hand

deck = []
suits = ["D", "S", "C", "H"]
values = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]


def make_deck():
    for val in values:
        if val == "A" or val == "J" or val == "Q" or val == "K":
            val = 10
        for suit in suits:
            card = suit, val
            deck.append(card)
    random.shuffle(deck)
    print(deck)
