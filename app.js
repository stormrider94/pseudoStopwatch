const hour_elem = document.querySelector(".time .hours")
const min_elem = document.querySelector(".time .minutes")
const sec_elem = document.querySelector(".time .seconds")
const millisec_elem = document.querySelector(".time.millisecond")
const reset_elem = document.querySelector(".functional#reset")
const start_elem = document.querySelector(".functional#play")

console.log(millisec_elem)
console.log(sec_elem)
console.log(min_elem)
console.log(hour_elem)
let millisecond_passed = 0
let sec_passed = 0
let min_passed = 0
let second_passed = 0
let hour_passed = 0

function updateStopWatch(){
    // min_passed = sec_passed % 60
    // hour_passed = min_passed % 60

    // min_elem.textContent = min_passed.toString().padStart(2,"0")
    // hour_elem.textContent = hour_passed.toString().padStart(2,"0")
    check_whether_to_update_sec()
    // check_whether_to_update_min()
    // check_whether_to_update_hour()
    
}

//function that starts when we press the play button 
function startStopWatch(){
setInterval(updateStopWatch,1)
}

// function that stops when we press the pause button
function stopStopWatch(){

}


function check_whether_to_update_sec(){
    if(millisecond_passed > 100){
        sec_passed = millisecond_passed % 100
        sec_elem.textContent = sec_passed.toString().padStart(2,"0")
        millisecond_passed = 0
        millisec_elem.textContent = millisecond_passed.toString().padStart(2,"0")
    }else {

        millisec_elem.textContent = millisecond_passed.toString().padStart(2,"0")
        millisecond_passed ++
        // the if block above will only execute once so this else 
        // block will execute almost all the time 
        // sec_passed = millisecond_passed
        // sec_elem.textContent = sec_passed.toString().padStart(2,"0")
    }
}

function check_whether_to_update_min(){
    if(second_passed > 60){
        min_passed = second_passed % 60
        min_elem.textContent = min_passed.toString().padStart(2,"0")
        second_passed = 0
        sec_elem.textContent = second_passed.toString().padStart(2,"0")
    }else {
        sec_elem.textContent = second_passed.toString().padStart(2,"0")
        second_passed ++
    }
}

function check_whether_to_update_hour(){
    if(min_passed > 60){
        hour_passed = min_passed % 60
        hour_elem.textContent = hour_passed.toString().padStart(2,"0")
        min_passed = 0
        min_elem.textContent = min_passed.toString().padStart(2,"0")
    }else {
        min_elem.textContent = min_passed.toString().padStart(2,"0")
        min_passed ++
    }
}
startStopWatch()