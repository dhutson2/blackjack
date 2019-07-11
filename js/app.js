let shuffledDeck = []
const usedCards = []
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

  let playerPoints = 0
  let playerWins = 0
  let dealerPoints = 0
  let dealerWins = 0

const shuffleAndDeal = () => {
	playerPoints = 0
	dealerPoints = 0
	makeNewDeck();
	shuffle(newDeck.deck);
	dealCards();
	addPlayerCardValues();
	addDealerCardValues();
	getPlayerScore();
	checkForWinner();
}

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

// deal player and dealer 2 cards each
const dealCards = () => {
	for(let i = 1; i <= 2; i++){
	let playerCards = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newPlayer.hand.push(playerCards);
	shuffledDeck.splice(playerCards, 1);
	let dealerCards = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newDealer.hand.push(dealerCards);
	shuffledDeck.splice(dealerCards, 1);
	}
	console.log(checkDealerFaceCard());
}

// give player a card, put it in their hand, and display hand total
const playerHit = () => {
	playerPoints = 0
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newPlayer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card)
	playerPoints = addPlayerCardValues();
	getPlayerScore();
	checkForWinner();
}

// give dealer a card, put it in their hand, and display hand total
const dealerHit = () => {
	dealerPoints = 0
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newDealer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card);
	dealerPoints = addDealerCardValues();
	checkForWinner();
	getDealerScore();
}

const addDealerCardValues = () => {
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
	checkForFlipWin();
	return dealerPoints
}

const addPlayerCardValues = () => {
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
	showPlayerValues();
	return playerPoints
}


const showPlayerValues = () => {
	if(playerPoints > 21){
		console.log('player loses with ' + playerPoints)
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(playerPoints == 21){
		console.log('player wins with 21!')
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else {
		console.log('player currently has ' + playerPoints)
	}
}

const checkForFlipWin = () => {
	if(dealerPoints == 21){
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(dealerPoints >= 17 && playerPoints >= 17 && dealerPoints > playerPoints){
		console.log('dealer wins with ' + dealerPoints);
	}
}

const checkDealerFaceCard = () => {
	if(newDealer.hand[0].value == 11){
		console.log('Oh sh*t dealer has ' + newDealer.hand[0].value + '!')
	} else {
		console.log('Dealer face card is ' + newDealer.hand[0].value + '.')
	}
}

// add this only to dealer hit card
//in player hit just do check value to ensure under 21
const checkForWinner = () => {
	if(dealerPoints == 21){
		console.log('dealer wins with 21!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(playerPoints == 21) {
		console.log('player wins with ' + playerPoints)
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(dealerPoints > 21) {
		console.log('player wins with ' + playerPoints)
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(playerPoints < 17 && dealerPoints >= 17 && dealerPoints <= 21) {
		console.log('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(playerPoints >= 17 && playerPoints <= 21 && playerPoints > dealerPoints){
		console.log('player wins with ' + playerPoints);
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(playerPoints >= 17 && playerPoints <= 21 && playerPoints < dealerPoints){
		console.log('dealer wins with ' + dealerPoints);
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(dealerPoints == playerPoints && playerPoints >= 17){
		console.log('push!')
	}
}

const getDealerScore = () => {
	$('#dealer-hand').empty()
	$('#dealer-hand').append('Hand points: ' + dealerPoints)
}


const getPlayerScore = () => {
	$('#player-hand').empty()
	$('#player-hand').append('Hand points: ' + playerPoints)
}















