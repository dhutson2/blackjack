const sortedDeck = []
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const buildDeck = () => {

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			const card = {Value: values[x], Suit: suits[i]};
			sortedDeck.push(card);
		}
	}
	return deck;
}
