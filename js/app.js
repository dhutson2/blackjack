let shuffledDeck = []
const usedCards = []
const combinedCards = []
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Deck {
	constructor() {
	  this.deck = [];
  
	  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
	  const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
  
	  for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			const card = {value: values[x], suit: suits[i]};
			this.deck.push(card);
		}
	}
	}
  }

class Player{
	constructor(name){
		this.name = name;
		this.hand = [];
		this.turn = true;
	}
}

class Dealer{
	constructor(){
		this.name = 'dealer';
		this.hand = [];
		this.turn = false;
	}
}

  const newDeck = new Deck;
  const newPlayer = new Player('derek');
  const newDealer = new Dealer;

// thank you fisher yates shuffle method!
const shuffle = (array) => {
	let cards = array.length, i;
	while(cards > 0){
		i = Math.floor(Math.random()*cards--)
		shuffledDeck.push(array.splice(i, 1)[0]);
	}
	return shuffledDeck;
}

//TODO:
// Make a new deck everytime game ends
// const makeNewDeck = () => {
// 	combinedCards.push(shuffledDeck.concat(usedCards));
// 	shuffledDeck = []
// 	console.log(combinedCards)
// 	console.log(shuffledDeck)
// 	newPlayer.hand = []
// 	newDealer.hand = []
// }

const dealPlayerCard = () => {
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newPlayer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card)
}

const dealDealerCard = () => {
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newDealer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card);
}

const addCardValues = () => {
	handPoints = 0
	for(let i = 0; i < newDealer.hand.length; i++){
		if(newDealer.hand[i].value == 'J'){
			handPoints += 10
		} else if(newDealer.hand[i].value == 'Q'){
			handPoints += 10
		} else if(newDealer.hand[i].value == 'K'){
			handPoints += 10
		} else if(newDealer.hand[i].value == 'A'){
			handPoints += 11
		} else{
			handPoints += parseInt(newDealer.hand[i].value)
		}
	}
	return handPoints
}










