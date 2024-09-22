const hour_elem = document.querySelector(".time .hours");
const min_elem = document.querySelector(".time .minutes");
const sec_elem = document.querySelector(".time .seconds");
const millisec_elem = document.querySelector(".time.millisecond"); // Correct the class selector here
const reset_elem = document.querySelector(".functional#reset");
const start_elem = document.querySelector(".functional#play");
const addLap_elem = document.querySelector(".functional#lap")
// table elements and stuff 
const table  = document.querySelector('table')
const table_body = document.querySelector('tbody')
table.style.display = 'none'
let millisecond_passed = 0;
let sec_passed = 0;
let min_passed = 0;
let hour_passed = 0;
let has_hit_play = false
let stopwatch_interval
let total_elapsed_ms = 0

function updateStopWatch(){
    millisecond_passed++;
    if(millisecond_passed >= 100){
        millisecond_passed = 0;
        sec_passed++;
        if(sec_passed >= 60){
            sec_passed = 0;
            min_passed++;
            if(min_passed>=60){
                min_passed = 0;
                hour_passed++;
            }
        }
    }
    // console.log(millisec_elem)
    millisec_elem.textContent = millisecond_passed.toString().padStart(2,"0");
    sec_elem.textContent = sec_passed.toString().padStart(2,"0")
    min_elem.textContent = min_passed.toString().padStart(2,"0")
    hour_elem.textContent = hour_passed.toString().padStart(2,"0")
}

// Function that starts the stopwatch when we press the play 
// button

function startsStopWatch(){
    if(!stopwatch_interval) {
        stopwatch_interval = setInterval(updateStopWatch,1)
    }
}

function stopStopWatch(){
    clearInterval(stopwatch_interval)
    stopwatch_interval = null;
}

function resetStopWatch(){
    millisecond_passed = 0;
    sec_passed = 0
    min_passed = 0
    hour_passed = 0

    millisec_elem.textContent = millisecond_passed.toString().padStart(2,"0");
    sec_elem.textContent = sec_passed.toString().padStart(2,"0")
    min_elem.textContent = min_passed.toString().padStart(2,"0")
    hour_elem.textContent = hour_passed.toString().padStart(2,"0")
    
    start_elem.textContent = "play"
    has_hit_play = !has_hit_play
    //let's remove the children from the table body
    // and then let's hide it
    console.log(table_body.lastElementChild)
    while(table_body.lastElementChild){
        table_body.removeChild(table_body.lastElementChild)
    }
    table.style.display = "none"

    stopStopWatch()

}

function addLap(){
    // show the table as soon as you add lap
    table.style.display = "table"
// remember you can't add lap when pause has been clicked
    if(!has_hit_play){
        return 
    }
    //Current time in milliseconds
    let current_time_ms = hour_passed * 3600000 + min_passed * 60000 + sec_passed * 100 + millisecond_passed

    // Add the current lap time to the total elapsed time 
    total_elapsed_ms += current_time_ms
    // Create a new row 
    const new_row = document.createElement('tr')

    // Create a cell for the lap number
    const lap_number_cell = document.createElement('td')
    lap_number_cell.textContent = table_body.rows.length + 1;
    new_row.appendChild(lap_number_cell)

    // Create a cell for the current lap time 
    const lap_time_cell = document.createElement('td')
    const time_str = `${hour_passed.toString().padStart(2,'0')}:` +
    `${min_passed.toString().padStart(2,"0")}:` +
    `${sec_passed.toString().padStart(2,"0")}:` +
    `${millisecond_passed.toString().padStart(2,"0")}`
    lap_time_cell.textContent = time_str
    new_row.appendChild(lap_time_cell)

    // Create a cell for the total elapsed time 
    const total_elapsed_time_cell = document.createElement('td')
    const total_elapsed_time_str = formatMilliseconds(total_elapsed_ms)
    total_elapsed_time_cell.textContent = total_elapsed_time_str
    new_row.appendChild(total_elapsed_time_cell)

    // we then append the new row to the table body 
    table_body.appendChild(new_row)
}
// helper function to format milliseconds into h:m:s:ms

function formatMilliseconds(ms){
    const hours = Math.floor(ms/(60*60*100))
    ms %= 60 * 60 * 100
    const minutes = Math.floor(ms/(60*100))
    ms %= 60 * 100
    const seconds = Math.floor(ms/100)
    const milliseconds = ms % 100

    return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}:${milliseconds.toString().padStart(2,"0")}`
}
start_elem.addEventListener("click",()=>{
    if(!has_hit_play){
        startsStopWatch()
        start_elem.textContent = "pause"
        has_hit_play = !has_hit_play
    }
    else{
        has_hit_play = !has_hit_play
        start_elem.textContent = "play"
        stopStopWatch()
    }
})
reset_elem.addEventListener("click",resetStopWatch)
addLap_elem.addEventListener("click",addLap)
// remember you can't add lap when pause has been clicked

