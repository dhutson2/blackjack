let shuffledDeck = []
const usedCards = []
const suits = ["spades", "diamonds", "clubs", "hearts"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const modal = $("#myModal")[0];
const btn = $("#instruction-button")[0];
const span = $(".close")[0];
const $shuffle = $('#shuffle')

//TODO:

// Make object to construct images...
// Constructor parameters are suit and value that will tell the object which card image to render
// Images object has key: value of Qclubs, 9,hearts, etc. and value is SVG image link
// EX:
//  const images = {
// 	'9hearts': '../cardImages/9_of_hearts.svg'
// }


$(document).ready(function() {
	console.log('fully loaded!')
	$('#home-page').show()
	$('#cards').hide()
   });

$('#start-game').click(function(){
	$('#home-page').hide()
	$('#title').hide()
	$('#homepage-buttons').hide()
	shuffleAndDeal();
	$('#cards').show()
  })

$('#shuffle').click(function(){
	shuffleAndDeal();
})

$('#hit').click(function(){
	playerHit();
})

$('#stand').click(function(){
	while(dealerPoints < 17){
	dealerHit();
	}
})

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

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
	checkForBlackjack();
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
	checkPlayerWin();
}


// give dealer a card, put it in their hand, and display hand total
const dealerHit = () => {
	dealerPoints = 0
	let card = shuffledDeck[Math.floor(Math.random()*shuffledDeck.length)]
	newDealer.hand.push(card);
	shuffledDeck.splice(card, 1);
	usedCards.push(card);
	dealerPoints = addDealerCardValues();
	checkDealerWin();
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
		getDealerScore();
	}
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
		getPlayerScore();
	}
	return playerPoints
}


const checkForBlackjack = () => {
	if(dealerPoints == 21){
		alert('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(playerPoints == 21){
		alert('player wins!')
		$('#player-wins').empty()
		dealerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(playerPoints == dealerPoints && dealerPoints >= 17 && playerPoints >= 17){
		alert('push!')
	}
}


const checkPlayerWin = () => {
	if(playerPoints == 21){
		alert('player wins!')
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(playerPoints > 21){
		alert('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(playerPoints == dealerPoints && playerPoints >= 17 && dealerPoints >= 17){
		alert('push!')
	}
}

const checkDealerWin = () => {
	if(dealerPoints == 21 && playerPoints !== 21){
		alert('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(dealerPoints > 21){
		alert('player wins!')
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(dealerPoints >= 17 && dealerPoints < 21 && playerPoints < 17){
		alert('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(dealerPoints >= 17 && dealerPoints < 21 && playerPoints >= 17 && playerPoints < 21 && playerPoints > dealerPoints){
		alert('player wins!')
		$('#player-wins').empty()
		playerWins++
		$('#player-wins').append('Wins: ' + playerWins)
	} else if(dealerPoints >= 17 && dealerPoints < 21 && playerPoints >= 17 && playerPoints < 21 && playerPoints < dealerPoints){
		alert('dealer wins!')
		$('#dealer-wins').empty()
		dealerWins++
		$('#dealer-wins').append('Wins: ' + dealerWins)
	} else if(dealerPoints == playerPoints){
		alert('push!')
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













