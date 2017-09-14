// jQuery loader function
// =======================================================================
$(document).ready(function() {

	// Initialize variables & audios
	// ===================================================================
	var counter = 0;
	var win = 0;
	var lose = 0;
	var theme = new Audio('assets/audio/theme.mp3');  // loads theme audio
	theme.volume = 0.3; // set volume
    theme.play(); // plays theme
	var clickSound = new Audio('assets/audio/beep.mp3');  // loads clickSound
	clickSound.preload = 'auto';
	clickSound.load();
	var winAudio = new Audio('assets/audio/winAudio.mp3');  // loads win effect 
	var loseAudio = new Audio('assets/audio/loseAudio.mp3');  // loads lose effect 
	
	// Diamond images source
	var diamondSrc = [
		'assets/images/diamond01.gif',
		'assets/images/diamond02.gif',
		'assets/images/diamond03.gif',
		'assets/images/diamond04.gif'];

	// set win/loss div's text 
	$('#win').text(win);
	$('#lose').text(lose);
	
	// Init functions
	newDiamonds();
	startGame();

    // Close instructions window
	$("#button").click(function(){
		$("#instructions").hide(1000);
		});

	// this function plays sound even if the previous has not ended	
	$("#diamonds").click(function(){
		  var click=clickSound.cloneNode();
		  click.play();
			});
	 
	// Functions
	// ==============================================================
	
	function createDiamond(dataValue,src) {
		var diamondImage = $('<img>'); // create image div
			diamondImage.attr({ 'data-value': dataValue, src: src, alt: "diamonds"}); // add attributes		
			diamondImage.addClass('diamondImage'); // add class
			$('#diamonds').append(diamondImage); // append to div
	}		
   
	// 
	function newDiamonds () {
		// Create an array with 4 non-repeating numbers from 1-12
			var values = [];
			while(values.length < 4){ // insert 4 elements into array
		    var randomNum = Math.ceil(Math.random()*12); // each element is a random number (1-12)
	     	var repeatNum = false;  // set a variable and for loop to avoid repeated numbers
			for (var i = 0; i < values.length; i++){
				if (values[i] == randomNum){
					repeatNum = true; 
					break;
				}
			  }
			  if(!repeatNum)
				values[values.length] = randomNum;
			  } // if

			 // create diamond objects with attributes & class, append to #crystal div 
			for (var j = 0; j < values.length; j++) {
        		createDiamond(values[j], diamondSrc[j]);
			} //for

	} // newDiamonds()

	function startGame() {

		counter = 0; // set counter to 0
		$('#partialScore').text(counter); // display score current score

		var numberToMatch = Math.floor(Math.random()*(120-19+1)+19); // generate random number with 19-120 range
		$('.numberMatch').text(numberToMatch); // display number to match

		// create evenlistener to add value to counter based on diamond attribute 'num'
		$('.diamondImage').on('click', function(){  
			counter = counter + parseInt($(this).data('value'));
		   // adds current score to partialScore div
		    $('#partialScore').text(counter);
			
	// Logic
    // =====================================================================
		    if (counter == numberToMatch){
			  winAudio.play();
			  $('#medals').html( "<img src='assets/images/win.png'>" );
		      win ++;
		      $('#win').text(win);
		      $('#diamonds').empty();
		      newDiamonds();
		      startGame();
		        
		    } else if ( counter > numberToMatch){
				loseAudio.play();
				$('#medals').html( "<img src='assets/images/lost.png'>" );
		        lose ++;
		        $('#lose').text(lose);
		        $('#diamonds').empty();
		        newDiamonds();
		        startGame();
			} // if
			
		}); // .diamondImage onClick()

	} // startGame()

}); // jQuery loader