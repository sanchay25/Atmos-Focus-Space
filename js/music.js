(function () {
  let playing = false;
  let isProcessing = false;
  let currentMode = null;

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
    if (!id) return;

    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");

    currentMode = "video";

    iframe.src =
      "https://www.youtube.com/embed/" +
      id +
      "?autoplay=1&mute=1&loop=1&playlist=" +
      id;

    iframe.height = "100%";
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
      const val = select.value;
      if (!val) return;
      playVideo(val);
    }
  };

  window.musicPlayUrl = function () {
    if (isProcessing) return;
    isProcessing = true;

    const input = document.getElementById("music-url-input");
    const val = input.value.trim();

    if (!val) {
      isProcessing = false;
      return;
    }

    const id = extractVideoId(val);

    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");

    if (id) {
      playVideo(id);
    } else {
      if (currentMode === "video") return;

      currentMode = "search";

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

    input.value = "";

    setTimeout(() => {
      isProcessing = false;
    }, 400);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("music-select").addEventListener("change", () => {
      if (playing) {
        stopVideo();
        const select = document.getElementById("music-select");
        const val = select.value;
        if (!val) return;
        playVideo(val);
      }
    });

    document
      .getElementById("music-url-input")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          window.musicPlayUrl();
        }
      });
  });
})();
