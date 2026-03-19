(function () {
  let playing = false;

  const audio = document.getElementById("audio-player");
  const btn = document.getElementById("music-toggle-btn");
  const select = document.getElementById("music-select");
  const player = document.getElementById("music-player");

  function playAudio(src) {
    audio.src = src;

    audio
      .play()
      .then(() => {
        player.classList.remove("hidden");
        btn.textContent = "Stop Sound";
        playing = true;
      })
      .catch(() => {
        alert("Click again to allow audio");
      });
  }

  function stopAudio() {
    audio.pause();
    audio.currentTime = 0;
    btn.textContent = "Play Sound";
    playing = false;
  }

  window.musicToggle = function () {
    if (playing) {
      stopAudio();
    } else {
      playAudio(select.value);
    }
  };

  select.addEventListener("change", () => {
    if (playing) {
      playAudio(select.value);
    }
  });
})();
