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

const images = {
	'2Hearts': 'cardImages/2_of_hearts.svg',
	'3Hearts': 'cardImages/3_of_hearts.svg',
	'4Hearts': 'cardImages/4_of_hearts.svg',
	'5Hearts': 'cardImages/5_of_hearts.svg',
	'6Hearts': 'cardImages/6_of_hearts.svg',
	'7Hearts': 'cardImages/7_of_hearts.svg',
	'8Hearts': 'cardImages/8_of_hearts.svg',
	'9Hearts': 'cardImages/9_of_hearts.svg',
	'10Hearts': 'cardImages/10_of_hearts.svg',
	'JHearts': 'cardImages/jack_of_hearts2.svg',
	'QHearts': 'cardImages/queen_of_hearts2.svg',
	'KHearts': 'cardImages/king_of_hearts2.svg',
	'AHearts': 'cardImages/ace_of_hearts.svg',
	'2Diamonds': 'cardImages/2_of_diamonds.svg',
	'3Diamonds': 'cardImages/3_of_diamonds.svg',
	'4Diamonds': 'cardImages/4_of_diamonds.svg',
	'5Diamonds': 'cardImages/5_of_diamonds.svg',
	'6Diamonds': 'cardImages/6_of_diamonds.svg',
	'7Diamonds': 'cardImages/7_of_diamonds.svg',
	'8Diamonds': 'cardImages/8_of_diamonds.svg',
	'9Diamonds': 'cardImages/9_of_diamonds.svg',
	'10Diamonds': 'cardImages/10_of_diamonds.svg',
	'JDiamonds': 'cardImages/jack_of_diamonds2.svg',
	'QDiamonds': 'cardImages/queen_of_diamonds2.svg',
	'KDiamonds': 'cardImages/king_of_diamonds2.svg',
	'ADiamonds': 'cardImages/ace_of_diamonds.svg',
	'2Spades': 'cardImages/2_of_spades.svg',
	'3Spades': 'cardImages/3_of_spades.svg',
	'4Spades': 'cardImages/4_of_spades.svg',
	'5Spades': 'cardImages/5_of_spades.svg',
	'6Spades': 'cardImages/6_of_spades.svg',
	'7Spades': 'cardImages/7_of_spades.svg',
	'8Spades': 'cardImages/8_of_spades.svg',
	'9Spades': 'cardImages/9_of_spades.svg',
	'10Spades': 'cardImages/10_of_spades.svg',
	'JSpades': 'cardImages/jack_of_spades2.svg',
	'QSpades': 'cardImages/queen_of_spades2.svg',
	'KSpades': 'cardImages/king_of_spades2.svg',
	'ASpades': 'cardImages/ace_of_spades.svg',
	'2Clubs': 'cardImages/2_of_clubs.svg',
	'3Clubs': 'cardImages/3_of_clubs.svg',
	'4Clubs': 'cardImages/4_of_clubs.svg',
	'5Clubs': 'cardImages/5_of_clubs.svg',
	'6Clubs': 'cardImages/6_of_clubs.svg',
	'7Clubs': 'cardImages/7_of_clubs.svg',
	'8Clubs': 'cardImages/8_of_clubs.svg',
	'9Clubs': 'cardImages/9_of_clubs.svg',
	'10Clubs': 'cardImages/10_of_clubs.svg',
	'JClubs': 'cardImages/jack_of_clubs2.svg',
	'QClubs': 'cardImages/queen_of_clubs2.svg',
	'KClubs': 'cardImages/king_of_clubs2.svg',
	'AClubs': 'cardImages/ace_of_clubs.svg',
}

// this will find card in images array and add it to body


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
	renderCardFace();
	$('#cards').show()
  })

$('#shuffle').click(function(){
	shuffleAndDeal();
	renderCardFace();
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
			card.image = images[`${card.value}${card.suit}`]
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

class addCardImages {
	constructor(value, suit){
		this.value = value
		this.suit = suit
		this.image = images[`${this.value}${this.suit}`]
	}
}

  let newDeck = new Deck;
  const newPlayer = new Player('player');
  let newImage = new addCardImages(6, 'Hearts')
  const newDealer = new Dealer;

  let playerPoints = 0
  let playerWins = 0
  let dealerPoints = 0
  let dealerWins = 0



  //TODO:
// make face a changing variable that will update with cards drawn
// make a loop that adds images on draw to a cards array in players hand
// Will also empty hand at start of loop so you don't get repeating cards in hand
const renderCardFace = () => {
	$('#player-current-cards').empty()
	for(let i = 0; i < newPlayer.hand.length; i++){
		console.log(newPlayer.hand[i].image)
		let img = $('<img>')
		// img.attr('src', images[face],);
		img.attr({
			src: newPlayer.hand[i].image, 
			height: "250px",
			width: "150px",
			margin: '15px'
		});
		$('#player-current-cards').append(img)
	}


}

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
	renderCardFace();
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













