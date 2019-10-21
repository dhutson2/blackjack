# IMPORTS HERE


DATABASE = Sqlitedatabase('odds.sqlite')


class Odds_Table(Model):
    hand_value = IntegerField()
    chance_for_this_hand_value_after_2_cards = IntegerField()
    chance_third_card_value_not_over_21 = IntegerField()
    chance_fourth_card_value_not_over_21 = IntegerField()


def initialize():
    DATABASE.connect()
    DATABASE.create_tables([Odds_Table], safe=True)
    print('TABLES CREATED')
    DATABASE.close()
