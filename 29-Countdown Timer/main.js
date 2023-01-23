let countdown
const timerDisplay = document.querySelector(".display__time-left")
const endTime = document.querySelector(".display__end-time")
const buttons = document.querySelectorAll("[data-time]")

function timer(seconds) {
    //clear any existing timer
    clearInterval(countdown)
    const now = Date.now()
    const then = now + seconds * 1000
    displayTimeLeft(seconds)
    displayEndTime(then)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000)
        if(secondsLeft < 0) {
            clearInterval(countdown)
            return
        }
        //display it
        displayTimeLeft(secondsLeft)
    }, 1000)
}


function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`
    document.title = display
    timerDisplay.textContent = display    
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hour = end.getHours()
    const minutes = end.getMinutes()
    endTime.textContent = `Be back at ${hour}:${minutes}`
}

buttons.forEach( button => button.addEventListener("click", startTimer))

function startTimer(){
    const seconds = parseInt(this.dataset.time)
    timer(seconds)
}

document.customForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const mins = this.minutes.value
    console.log(mins)
    timer(mins * 60)
    this.rest()
})