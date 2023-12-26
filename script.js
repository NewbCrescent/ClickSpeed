const cpsButton = document.getElementById("clicked");
const clickContainer = document.getElementById("clicker-container");
const timer = document.querySelector("div p");
const headTimer = document.querySelector("div h2 span");
const restartButton = document.getElementById("restart");
const secondsTextElement = document.getElementById("seconds");
const cpsTextElement = document.querySelector("#cps");
const allChoosingButtons = document.querySelectorAll("#choosing button");

let totalSeconds = +secondsTextElement.textContent;
let click = 0;
let seconds = totalSeconds;
let interval;

function restartActivated() {
    click = 0;
    seconds = totalSeconds;
    headTimer.textContent = totalSeconds;
    secondsTextElement.textContent = totalSeconds;
    cpsTextElement.textContent = "Haven't Started";
    clearInterval(interval);
}

for (let i = 0; i < allChoosingButtons.length; ++i) {
    allChoosingButtons[i].onclick = function () {
        const secondsFromButton = +allChoosingButtons[i].firstChild.textContent; //first child is the span element
        totalSeconds = secondsFromButton;
        restartActivated();
        restartButton.style.display = "none";
    };
}

function timerDecreases() {
    if (seconds > 0) {
        --seconds;
        secondsTextElement.textContent = seconds;
    }
}

function resultClicks() {
    cpsTextElement.textContent = click/totalSeconds;
}

function trackClicks() {
    if (seconds > 0) {
        if (click == 0) {
            restartButton.style.display = "inline-block"
            interval = setInterval(timerDecreases, 1000);
        }
        ++click;
        resultClicks();
    }
}

cpsButton.onclick = trackClicks;
restartButton.onclick = restartActivated;