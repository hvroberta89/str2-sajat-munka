'use strict';

const clockBox = document.querySelector(".clock-box");

function displayCurrentTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let timeString = `${hours} : ${minutes} : ${seconds}`;

    clockBox.innerText = timeString;
    setInterval(displayCurrentTime, 500);
}

export default displayCurrentTime;

