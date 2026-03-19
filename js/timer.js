(function () {
  const MODES = [
    { label: "Pomodoro", seconds: 25 * 60 },
    { label: "Short Break", seconds: 5 * 60 },
    { label: "Long Break", seconds: 15 * 60 },
  ];

  let mode = 0;
  let timeLeft = MODES[0].seconds;
  let running = false;
  let interval = null;

  function render() {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const secs = String(timeLeft % 60).padStart(2, "0");
    document.getElementById("timer-display").textContent = mins + ":" + secs;

    const btn = document.getElementById("timer-toggle-btn");
    if (running) {
      btn.textContent = "Pause";
    } else if (timeLeft === MODES[mode].seconds) {
      btn.textContent = "Start";
    } else {
      btn.textContent = "Resume";
    }

    const buttons = document.querySelectorAll("#timer-modes button");
    buttons.forEach((b, i) => {
      if (i === mode) {
        b.className = "text-xs font-semibold text-[#d0d6e0]";
      } else {
        b.className =
          "text-xs text-[#7a839b] hover:text-[#d0d6e0] transition-colors";
      }
    });
  }

  function tick() {
    if (timeLeft <= 1) {
      timeLeft = 0;
      running = false;
      clearInterval(interval);
      interval = null;
      try {
        new Audio(
          "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
        ).play();
      } catch (e) {}
    } else {
      timeLeft--;
    }
    render();
  }

  window.timerToggle = function () {
    running = !running;
    if (running) {
      interval = setInterval(tick, 1000);
    } else {
      clearInterval(interval);
      interval = null;
    }
    render();
  };

  window.timerReset = function () {
    running = false;
    clearInterval(interval);
    interval = null;
    timeLeft = MODES[mode].seconds;
    render();
  };

  window.timerSwitchMode = function (i) {
    mode = i;
    running = false;
    clearInterval(interval);
    interval = null;
    timeLeft = MODES[i].seconds;
    render();
  };

  document.addEventListener("DOMContentLoaded", render);
})();
