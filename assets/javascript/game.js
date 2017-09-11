// jQuery loader function
$(document).ready(function() {

	// initialize variables & load audios
	var counter = 0;
	var wins = 0;
	var losses = 0;
	var theme = new Audio('assets/audio/theme.mp3');  // loads theme audio
	var beep = new Audio('assets/audio/beep.mp3');  // loads beep
	beep.preload = 'auto';
	beep.load();
	var winAudio = new Audio('assets/audio/winAudio.mp3');  // loads win effect 
	var lostAudio = new Audio('assets/audio/lostAudio.mp3');  // loads lost effect 
	
	theme.volume = 0.3; // set volume
    theme.play(); // plays theme
	
	// crystal images source
	crystals = [
		'assets/images/crystal01.gif',
		'assets/images/crystal02.gif',
		'assets/images/crystal03.gif',
		'assets/images/crystal04.gif'];


	// set win/loss div's text 
	$('#wins').text(wins);
	$('#losses').text(losses);
	
	newCrystals();
	newGame();

    // Close instructions
	$("#button").click(function(){
		$("#instructions").hide(1000);
		});

	// this function plays sound even if the previous has not ended	
	$("#crystals").click(function(){
		  var click=beep.cloneNode();
		  click.play();
			});

	function newCrystals () {
		// Create an array with 4 non-repeating numbers from 1-12
		var numbers = []
			while(numbers.length < 4){
			  var randomnumber = Math.ceil(Math.random()*12)
			  var found = false;
			  for (var i=0; i< numbers.length; i++){
				if (numbers[i] == randomnumber){
					found = true; break
				}
			  }
			  if(!found)numbers[numbers.length]=randomnumber;
			}

		for (i = 0; i < numbers.length; i++) {
			var imageCrystal = $('<img>');
			imageCrystal.attr('data-num', numbers[i]);
			imageCrystal.attr('src', crystals[i]);
			imageCrystal.attr('alt', 'crystals');
			imageCrystal.addClass('crystalImage')
			$('#crystals').append(imageCrystal);
		}
	} // newCrystals

	function newGame() {

		counter = 0; // set counter to 0
		$('#partialScore').text(counter); // display score current score

		var numberToMatch = Math.floor(Math.random()*(120-19+1)+19); // generate random number with 9-120 range
		$('.numberMatch').text(numberToMatch); // display number to match

		$('.crystalImage').on('click', function(){
			counter = counter + parseInt($(this).data('num'));
		   
		    $('#partialScore').text(counter);

		    if (counter == numberToMatch){
			  winAudio.play();
			  $('#medals').html( "<img src='assets/images/win.png'>" );
		      wins ++;
		      $('#wins').text(wins);
		      $('#crystals').empty();
		      newCrystals();
		      newGame();
		        
		    } else if ( counter > numberToMatch){
				lostAudio.play();
				$('#medals').html( "<img src='assets/images/lost.png'>" );
		        losses ++;
		        $('#losses').text(losses);
		        $('#crystals').empty();
		        newCrystals();
		        newGame();
			} // if
			
		}); // .crystalImage onClick

	} // newGame

}); // jQuery loader