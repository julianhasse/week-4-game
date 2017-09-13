// jQuery loader function
$(document).ready(function() {

	// initialize variables & load audios
	var counter = 0;
	var wins = 0;
	var losses = 0;
	var theme = new Audio('assets/audio/theme.mp3');  // loads theme audio
	theme.volume = 0.3; // set volume
    theme.play(); // plays theme
	var clickSound = new Audio('assets/audio/beep.mp3');  // loads clickSound
	clickSound.preload = 'auto';
	clickSound.load();
	var winAudio = new Audio('assets/audio/winAudio.mp3');  // loads win effect 
	var lostAudio = new Audio('assets/audio/lostAudio.mp3');  // loads lost effect 
	
	// crystal images source
	var crystalSource = [
		'assets/images/crystal01.gif',
		'assets/images/crystal02.gif',
		'assets/images/crystal03.gif',
		'assets/images/crystal04.gif'];

	// set win/loss div's text 
	$('#wins').text(wins);
	$('#losses').text(losses);
	
	newDiamonds();
	startGame();

    // Close instructions
	$("#button").click(function(){
		$("#instructions").hide(1000);
		});

	// this function plays sound even if the previous has not ended	
	$("#diamonds").click(function(){
		  var click=clickSound.cloneNode();
		  click.play();
			});
	 
	//  
	function createDiamond(dataNum,src) {
		var diamondImage = $('<img>'); // create image div
			diamondImage.attr({ 'data-num': dataNum, src: src, alt: "diamonds"}); // add attributes		
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

			 // create crystal objects with attributes & class, append to #crystal div 
			for (var j = 0; j < values.length; j++) {
        		createDiamond(values[j], crystalSource[j]);
			} //for

	} // newDiamonds()

	function startGame() {

		counter = 0; // set counter to 0
		$('#partialScore').text(counter); // display score current score

		var numberToMatch = Math.floor(Math.random()*(120-19+1)+19); // generate random number with 9-120 range
		$('.numberMatch').text(numberToMatch); // display number to match

		// create evenlistener to add value to counter based on crystal attribute 'num'
		$('.diamondImage').on('click', function(){  
			counter = counter + parseInt($(this).data('num'));
		   // adds current score to partialScore div
		    $('#partialScore').text(counter);
			// checks numberToMatch with current score
		    if (counter == numberToMatch){
			  winAudio.play();
			  $('#medals').html( "<img src='assets/images/win.png'>" );
		      wins ++;
		      $('#wins').text(wins);
		      $('#diamonds').empty();
		      newDiamonds();
		      startGame();
		        
		    } else if ( counter > numberToMatch){
				lostAudio.play();
				$('#medals').html( "<img src='assets/images/lost.png'>" );
		        losses ++;
		        $('#losses').text(losses);
		        $('#diamonds').empty();
		        newDiamonds();
		        startGame();
			} // if
			
		}); // .diamondImage onClick()

	} // startGame()

}); // jQuery loader