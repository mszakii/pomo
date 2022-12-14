// timer
let timer = document.getElementById("timer");
let minDiv = document.getElementById("minDiv");
let secDiv = document.getElementById("secDiv");
let finishS = document.getElementById("finishS");
let clickS = document.getElementById("clickS");
let started = false;

function counter(count) {
  started = true;

  let milSec = count * 60;

  Notification.requestPermission().then((prem) => {
    if (prem === "granted") {
      new Notification(`Pomodoro started ${count} minutes`, {
        icon: "https://mszakii.github.io/pomo/logo.png",
      });
    }
  });

  let countDown = setInterval(() => {
    if (milSec == 0) {
      clearInterval(countDown);
      finishS.play();
      Notification.requestPermission().then((prem) => {
        if (prem === "granted") {
          new Notification(`Pomodoro finished`, {
            icon: "https://mszakii.github.io/pomo/logo.png",
          });
        }
      });
    } else {
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
    }
  }, 1000);
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
      clickS.play();
      counter(count);
    }
  }
}

timer.onclick = function () {
  if (started !== true) {
    clickS.play();
    counter(count);
  }
};

// left = 37
// up = 38
// right = 39
// down = 40
