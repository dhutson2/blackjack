let shuffledDeck = []
const usedCards = []
const combinedCards = []
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const modal = $("#myModal")[0];

// Get the button that opens the modal
const btn = $("#instruction-button")[0];

// Get the <span> element that closes the modal
const span = $(".close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


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

  let newDeck = new Deck;
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

// Make a new deck everytime game ends
const makeNewDeck = () => {
	newDeck = new Deck
	shuffledDeck = []
	newPlayer.hand = []
	newDealer.hand = []
}

// give player a card, put it in their hand, and display hand total
const dealPlayerCard = () => {
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newPlayer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card)
	addPlayerCardValues();
}

// give dealer a card, put it in their hand, and display hand total
const dealDealerCard = () => {
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newDealer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card);
	addDealerCardValues();
}

const addDealerCardValues = () => {
	dealerPoints = 0
	for(let i = 0; i < newDealer.hand.length; i++){
		if(newDealer.hand[i].value == 'J'){
			dealerPoints += 10
		} else if(newDealer.hand[i].value == 'Q'){
			dealerPoints += 10
		} else if(newDealer.hand[i].value == 'K'){
			dealerPoints += 10
		} else if(newDealer.hand[i].value == 'A'){
			dealerPoints += 11
		} else{
			dealerPoints += parseInt(newDealer.hand[i].value)
		}
	}
	checkDealerForWin();
	return dealerPoints
}

const addPlayerCardValues = () => {
	playerPoints = 0
	for(let i = 0; i < newPlayer.hand.length; i++){
		if(newPlayer.hand[i].value == 'J'){
			playerPoints += 10
		} else if(newPlayer.hand[i].value == 'Q'){
			playerPoints += 10
		} else if(newPlayer.hand[i].value == 'K'){
			playerPoints += 10
		} else if(newPlayer.hand[i].value == 'A'){
			playerPoints += 11
		} else{
			playerPoints += parseInt(newPlayer.hand[i].value)
		}
	}
	checkPlayerForWin();
	return playerPoints
}


const checkPlayerForWin = () => {
	if(playerPoints == 21){
		console.log('player wins with ' + playerPoints + '!')
	} else if(playerPoints > 21){
		console.log('player loses with ' + playerPoints + '!')
	} else if(playerPoints < 21){
		console.log('player currently has ' + playerPoints)
	}
}

const checkDealerForWin = () => {
	if(dealerPoints == 21){
		console.log('dealer wins with ' + dealerPoints + '!')
	} else if(dealerPoints > 21){
		console.log('dealer loses with ' + dealerPoints + '!')
	} else if(dealerPoints < 21){
		console.log('dealer currently has ' + dealerPoints)
	}
}





