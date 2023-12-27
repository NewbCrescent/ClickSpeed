const cpsButton = document.getElementById("clicked");
const clickContainer = document.getElementById("clicker-container");
const timer = document.querySelector("div p");
const headTimer = document.querySelector("div h2 span");
const plurals = document.querySelectorAll(".plural");
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
    if (headTimer.textContent == "1") {
        pluralWords("");
    }
    clearInterval(interval);
}

function pluralWords(char) {
    for (let i = 0; i < plurals.length; ++i) {
        plurals[i].textContent = char;
    }
}

for (let i = 0; i < allChoosingButtons.length; ++i) {
    allChoosingButtons[i].onclick = function () {
        const secondsFromButton = +allChoosingButtons[i].firstChild.textContent; //first child is the span element
        totalSeconds = secondsFromButton;
        if (secondsFromButton == 1) {
            pluralWords("");
        }
        else if (plurals[0].textContent == "") {
            pluralWords("s")
        }
        restartActivated();
        restartButton.style.display = "none";
    };
}

function timerDecreases() {
    if (seconds > 0) {
        --seconds;
        if (seconds == 1) {
            plurals[1].textContent = ""
        }
        else if (seconds == 0) {
            plurals[1].textContent = "s"
        }
        secondsTextElement.textContent = seconds;
    }
}

function resultClicks() {
    cpsTextElement.textContent = Math.round(click/totalSeconds * 100) / 100; //rounding to two decimal places
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