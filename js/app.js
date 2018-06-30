/*
 * Create a list that holds all of your cards
 */
var list = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function initCard(icon) {
    $('#main').append('<li class="card animated"> <i class="fa '+icon+'"> </i></li>');
}

//to count number of moves 
counter = 0;
// matched variable is used to count the number of matched card 
matched = 0;
// timer Object
const timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
});

/*
* @description this method will initialize the game by
* creating stars and the cards
*/
function initGame() { 
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
    $('.stars').append('<li><i class="fa fa-star"></i></li>');
    for(var i=0; i<2; i++) {
        list = shuffle(list);
        list.forEach(initCard); 
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// openCardArray will contain all the open cards
openCardArray=[]
/*
* @description to toggle the cards as well as increase the move counter 
* and on the basis of move counts change the number of stars 
*/
function showHide() {
    if (openCardArray.length === 0) {
        $(this).toggleClass("show open");
        openCardArray.push($(this));
        disadled();
    } else if (openCardArray.length === 1 ) {
        counter = counter + 1;
        $(".moves").html(`${counter}`);
        if (counter === 24) {
           $(".stars").children()[0].remove();
           $('.stars').append('<li><i class="fa fa-star-o"></i></li>');
        }
        if (counter === 16) {
            $(".stars").children()[0].remove();
            $('.stars').append('<li><i class="fa fa-star-o"></i></li>');
        }
        $(this).toggleClass("show open");
        openCardArray.push($(this));
      setTimeout(checkOpenCards,1000);
    
    }
}

/*
*@description cheOpenCards will find pairs of matched cardand increase the counting till 
*8th matched for all 16 cards and then pause the timer and popups the results message
*also player can reset the page to replay the game
*/
function checkOpenCards() {
if(openCardArray[0][0].firstElementChild.className == 
    openCardArray[1][0].firstElementChild.className) {
    openCardArray[0].addClass("match");
    openCardArray[1].addClass("match");
    matched = matched + 1;
    if (matched === 8) {
        timer.pause();
        var results = confirm("Congradulation you win the game!" + timer.getTimeValues().toString()+ "\n Do you want to play the game again?");
        if (results == true) { 
            location.reload();
        }
    }
    disadled();
    emptyOpenCardArray();
} else {
    openCardArray[0].toggleClass("show open");
    openCardArray[1].toggleClass("show open");
    unabled();
    emptyOpenCardArray();
    }
}

//emptyOpenCardArray method will empty the card array 
function emptyOpenCardArray() {
 openCardArray = [];
}

 // disabled method will disable click on the open card
function disadled() {
    openCardArray.forEach(function (box) {
    box.off("click");
    });
}

//this method will unable clicking on the particular card
function unabled() {
    openCardArray[0].click(showHide);
}

//starting the game
initGame();
$(".card").click(showHide);

//this mehod will reset the game
$(".fa-repeat").click(function() {
location.reload();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
