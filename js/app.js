const sortedDeck = []
const shuffledDeck = []
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const buildDeck = () => {

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			const card = {value: values[x], suit: suits[i]};
			sortedDeck.push(card);
		}
	}
	return sortedDeck;
}

const shuffleDeck = () => {
    while(sortedDeck.length > 0){
        let cardIndex = Math.floor(Math.random()*sortedDeck.length);
        let shuffledCard = sortedDeck.splice(cardIndex, 1);
        shuffledDeck.push(shuffledCard);
    }
    return shuffledDeck;
}