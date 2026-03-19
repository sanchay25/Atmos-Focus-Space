(function () {
  let playing = false;

  function playLocal() {
    const audio = document.getElementById("local-audio");
    const btn = document.getElementById("music-toggle-btn");

    if (!audio) return;

    audio.play();
    btn.textContent = "Stop Stream";
    playing = true;
  }

  function stopLocal() {
    const audio = document.getElementById("local-audio");
    const btn = document.getElementById("music-toggle-btn");

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    btn.textContent = "Play Stream";
    playing = false;
  }

  window.musicToggle = function () {
    if (playing) {
      stopLocal();
    } else {
      playLocal();
    }
  };

  window.musicPlayUrl = function () {
    playLocal();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("music-url-input");

    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          playLocal();
        }
      });
    }
  });
})();
