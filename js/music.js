(function () {
  let playing = false;

  function extractVideoId(input) {
    if (!input) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];
    for (const p of patterns) {
      const m = input.trim().match(p);
      if (m) return m[1];
    }
    return null;
  }

  function playVideo(id) {
    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");
    iframe.src =
      "https://www.youtube.com/embed/" +
      id +
      "?autoplay=1&mute=1&loop=1&playlist=" +
      id;
    player.classList.remove("hidden");
    btn.textContent = "Stop Stream";
    playing = true;
  }

  function stopVideo() {
    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");
    iframe.src = "";
    player.classList.add("hidden");
    btn.textContent = "Play Stream";
    playing = false;
  }

  window.musicToggle = function () {
    if (playing) {
      stopVideo();
    } else {
      const select = document.getElementById("music-select");
      playVideo(select.value);
    }
  };

  window.musicPlayUrl = function () {
    const input = document.getElementById("music-url-input");
    const val = input.value.trim();
    if (!val) return;

    const id = extractVideoId(val);
    if (id) {
      playVideo(id);
      input.value = "";
    } else {
      const searchQuery = encodeURIComponent(val);
      const searchUrl =
        "https://www.youtube.com/embed?listType=search&list=" + searchQuery;
      const player = document.getElementById("music-player");
      const iframe = document.getElementById("music-iframe");
      const btn = document.getElementById("music-toggle-btn");
      iframe.src = searchUrl;
      player.classList.remove("hidden");
      iframe.height = "200";
      btn.textContent = "Stop Stream";
      playing = true;
      input.value = "";
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("music-select").addEventListener("change", () => {
      if (playing) {
        stopVideo();
        const select = document.getElementById("music-select");
        playVideo(select.value);
      }
    });

    document
      .getElementById("music-url-input")
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          window.musicPlayUrl();
        }
      });
  });
})();
