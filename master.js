// timer
let timer = document.getElementById("timer");
let minDiv = document.getElementById("minDiv");
let secDiv = document.getElementById("secDiv");
let started = false;

function counter(count) {
  started = true;

  let milSec = count * 60;

  let countDown = setInterval(() => {
    milSec--;
    let min = Math.floor(milSec / 60);
    if (min < 10) {
      min = `0${Math.floor(milSec / 60)}`;
    }
    let sec = milSec % 60;
    if (sec < 10) {
      sec = `0${milSec % 60}`;
    }
    minDiv.innerHTML = min;
    secDiv.innerHTML = sec;
    document.title = `${min}:${sec} Pomodoro`;
  }, 1000);

  if (milSec == 0) {
    clearInterval(countDown);
  }
}

// contorlers

let count = 25;

document.onkeydown = checkKey;

function checkKey(e) {
  if (started !== true) {
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      if (count !== 60) {
        count++;
        if (count < 10) {
          minDiv.innerHTML = `0${count}`;
        } else {
          minDiv.innerHTML = count;
        }
        secDiv.innerHTML = "00";
      }
    } else if (e.keyCode == "40") {
      // down arrow
      if (count !== 0) {
        count--;
        if (count < 10) {
          minDiv.innerHTML = `0${count}`;
        } else {
          minDiv.innerHTML = count;
        }
        secDiv.innerHTML = "00";
      }
    } else if (e.keyCode == "32") {
      counter(count);
    }
  }
}

timer.onclick = function () {
  if (started !== true) {
    counter(count);
  }
};

// left = 37
// up = 38
// right = 39
// down = 40
