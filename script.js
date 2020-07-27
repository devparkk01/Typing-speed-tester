const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const result = document.querySelector("#result") ; 


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero (time) {
    if ( time < 10) {
        time =  '0' + time ; 
    }
    return time ; 
}

var timer = [0 , 0 , 0 , 0 ] ;
var interval  ; 
var timerRunning = false ;

// Run a standard minute/second/hundredths timer:
function runCounter() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2])  ;
    theTimer.innerHTML = currentTime ;
    timer[3]++ ; 

    timer[0] = Math.floor( timer[3] /6000 ) ;
    timer[1] = Math.floor(timer[3]/100 - timer[0] * 60) ; 
    timer[2] = Math.floor ( timer[3] - timer[0] * 6000 - timer[1] * 100) ;  

}


// Match the text entered with the provided text on the page:

function spellCheck() {
    let enterredText = testArea.value ;
    let enterredTextLength = enterredText.length ; 

    if (enterredText == originText ) {
        clearInterval(interval) ;  
        testWrapper.style.borderColor = "green" ; 
        // displaying result 
        result.classList.add("result") ; 
        result.innerHTML = "Yay! You've won" ; 
    }
    else if (enterredText == originText.substring( 0 , enterredTextLength) ) { 
        testWrapper.style.borderColor = "cyan" ; 
    }
    else {
        testWrapper.style.borderColor = "yellow" ;
    }

}


// Start the timer:
function start () {
    let enterredTextLength = testArea.value.length ; 
    if ( enterredTextLength === 0 && !timerRunning) {
        timerRunning = true ;
        interval = setInterval(runCounter , 10) ;
    }
}


// Reset everything:
function reset () {
    // resetting timer 
    clearInterval(interval) ;
    interval = null ; 
    timer = [ 0 , 0 , 0 , 0 ]  ; 
    theTimer.innerHTML = "00:00:00" ;
    timerRunning =false ;

    // resetting test area 
    testWrapper.style.borderColor = "grey" ;
    testArea.value = "" ;
    // resetting result 
    result.classList.remove("result") ; 
    result.innerHTML = "" ; 

}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress" , start , false) ; 
testArea.addEventListener("keyup" , spellCheck , false) ; 
resetButton.addEventListener("click" , reset , false) ; 
