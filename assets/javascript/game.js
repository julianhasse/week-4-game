/* Crystal Collectors, by Julian Hasse, 2017  */

// jQuery loader function
// =======================================================================
$(document).ready(function() {

	// Create stats Object 
	// ===================================================================
	var stats = new Object();
	stats.counter = 0;
	stats.win = 0;
	stats.lose = 0;
	
	// Initialize variables 
	// ===================================================================
	var $win = $('#win');
	var $lose = $('#lose');
	var $button = $("#button");
	var $medals = $('#medals');
	var $diamonds = $('#diamonds');
	var diamondSrc = [
		'assets/images/diamond01.gif',
		'assets/images/diamond02.gif',
		'assets/images/diamond03.gif',
		'assets/images/diamond04.gif'];

	$win.text(stats.win);
	$lose.text(stats.lose);
	
	// Initialize audio effects  
	// ===================================================================
	var theme = new Audio('assets/audio/theme.mp3');  // loads theme audio
	theme.volume = 0.3; // set volume
	theme.play(); // plays theme
	var clickSound = new Audio('assets/audio/beep.mp3');  // loads clickSound
	clickSound.preload = 'auto';
	clickSound.load();
	var winAudio = new Audio('assets/audio/winAudio.mp3');  // loads win effect 
	var loseAudio = new Audio('assets/audio/loseAudio.mp3');  // loads lose effect

	// Init functions
	// ===================================================================
	(function init() {
		newDiamonds();
		startGame();
	})();

    // Close instructions window
	$button.click(function(){
		$("#instructions").hide(1000);
		});

	// this function plays sound even if the previous has not ended	
	$diamonds.click(function(){
		  var click=clickSound.cloneNode();
		  click.play();
			});
	 
	// Main Functions
	// ==============================================================
	
	function createDiamond(dataValue,src) {
		var diamondImage = $('<img>'); // create image div
			diamondImage.attr({ 'data-value': dataValue, src: src, alt: "diamonds"}); // add attributes		
			diamondImage.addClass('diamondImage'); // add class
			$diamonds.append(diamondImage); // append to div
	}		
   
	// Create an array with 4 non-repeating numbers from 1-12
	function newDiamonds () {
			var values = [];
			// insert 4 elements into array
			while(values.length < 4){ 
			// each element is a random number (1-12)
			var randomNum = Math.ceil(Math.random()*12); 
			// set a variable and for loop to avoid repeated numbers
	     	var repeatNum = false;  
			for (var i = 0; i < values.length; i++){
				if (values[i] == randomNum){
					repeatNum = true; 
					break;
				}
			  }
			  if(!repeatNum)
				values[values.length] = randomNum;
			  } // if

			 // create diamond objects with attributes & class, append to diamonds div 
			for (var j = 0; j < values.length; j++) {
        		createDiamond(values[j], diamondSrc[j]);
			} //for

	} // newDiamonds()

	function startGame() {
		// set counter to 0
		stats.counter = 0; 
		// display score current score
		$('#partialScore').text(stats.counter); 
		// generate random number with 19-120 range
		var numberToMatch = Math.floor(Math.random()*(120-19+1)+19); 
		// display number to match
		$('.numberMatch').text(numberToMatch); 

		// create evenlistener to add value to counter based on diamond attribute 'num'
		$('.diamondImage').on('click', function(){  
			stats.counter = stats.counter + parseInt($(this).data('value'));
		// adds current score to partialScore div
		    $('#partialScore').text(stats.counter);
			
	// Logic
    // =====================================================================
		    if (stats.counter == numberToMatch){
				// play win audio
				winAudio.play();
				// add gold medal
				$medals.html( "<img src='assets/images/win.png'>" );
				// update counter
				stats.win ++;
				// update win score
				$win.text(stats.win);
				// clear objects
				$diamonds.empty();
				// init functions
		        newDiamonds();
		        startGame();
		        
		    } else if ( stats.counter > numberToMatch){
				// play lose audio
				loseAudio.play();
				// add thunder medal
				$medals.html( "<img src='assets/images/lost.png'>" );
				// update counter
				stats.lose ++;
				// update lose score
				$lose.text(stats.lose);
				// clear objects
				$diamonds.empty();
				// init functions
		        newDiamonds();
		        startGame();
			} // if
			
		}); // .diamondImage onClick()

	} // startGame()

}); // jQuery loader