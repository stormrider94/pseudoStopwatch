const hour_elem = document.querySelector(".time .hours");
const min_elem = document.querySelector(".time .minutes");
const sec_elem = document.querySelector(".time .seconds");
const millisec_elem = document.querySelector(".time .millisecond"); // Correct the class selector here
const reset_elem = document.querySelector(".functional#reset");
const start_elem = document.querySelector(".functional#play");

let millisecond_passed = 0;
let sec_passed = 0;
let min_passed = 0;
let hour_passed = 0;
let stopwatch_interval;

function updateStopWatch(){
    millisecond_passed++;

    if (millisecond_passed >= 1000) {
        millisecond_passed = 0;
        sec_passed++;
        if (sec_passed >= 60) {
            sec_passed = 0;
            min_passed++;
            if (min_passed >= 60) {
                min_passed = 0;
                hour_passed++;
            }
        }
    }

    millisec_elem.textContent = millisecond_passed.toString().padStart(3, "0");
    sec_elem.textContent = sec_passed.toString().padStart(2, "0");
    min_elem.textContent = min_passed.toString().padStart(2, "0");
    hour_elem.textContent = hour_passed.toString().padStart(2, "0");
}

// Function that starts the stopwatch when we press the play button 
function startStopWatch(){
    if (!stopwatch_interval) {
        stopwatch_interval = setInterval(updateStopWatch, 1);
    }
}

// Function that stops the stopwatch when we press the pause button
function stopStopWatch(){
    clearInterval(stopwatch_interval);
    stopwatch_interval = null;
}

// Event listeners for start and stop buttons
start_elem.addEventListener('click', startStopWatch);
reset_elem.addEventListener('click', stopStopWatch);
