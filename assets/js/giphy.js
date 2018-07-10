//array of topics
	  var topics = ["cat", "dog", "elephant", "horse", "deer", "frog", "goat", "sheep", "hamster", "skunk", "squirrel", "bear", "fox", "tiger", "lion", "meercat"];

	  //make buttons from array
	  function displayButtons(){
        $('.button-container').empty()
        for (var i = 0; i < topics.length; i++) {
          var newButton = $('<button>');
          newButton.text(topics[i]);
          newButton.addClass('my-buttons');
          newButton.attr('info', topics[i]);
          $('.button-container').append(newButton);
        }
      }

    displayButtons();

    // Add a button
    $('.add-button-form').on('submit', function(event){
    	event.preventDefault();
    	var newAnimal = $('#button-text').val();
    	topics.push(newAnimal);
    	displayButtons();
    });

    //click on the button, display images, animate/pause the giphys
    $(document).on('click', '.my-buttons', function(){
    	var animalName = $(this).attr('info');
    	//empty the images div
    	//$('#gifs').empty();
    	console.log(animalName);
    	$.get('https://api.giphy.com/v1/gifs/search?api_key=tmSO46SBQvgrMyGcPly3Zrc7k7zk8zFZ&q=' + animalName + '&limit=10', function(response){
    		var results = response.data
    		console.log(results);

    		for(var i=0; i < results.length; i++) {
   				var animalAddDiv = $('<div>');
   				var p = $('<p class="rating">');
   				p.text(results[i].rating);
   				var newImg = $('<img>');
   				newImg.addClass('my-imgs');
   				newImg.attr('src', results[i].images.fixed_height_still.url);
   				newImg.attr('data-still', results[i].images.fixed_height_still.url);
   				newImg.attr('data-animate', results[i].images.fixed_height.url);
   				newImg.attr("data-state", "still");
   				animalAddDiv.append(newImg);
   				animalAddDiv.append(p);
   				animalAddDiv.prependTo($('#gifs'));

        }

    		$(".my-imgs").on("click", function() {
	      console.log("this works");
	      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	      var state = $(this).attr("data-state");
	      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
	      // Then, set the image's data-state to animate
	      // Else set src to the data-still value
	      if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
	      } else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
            }
          });
    	})
    });
