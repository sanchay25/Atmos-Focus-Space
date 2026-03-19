(function () {
  let playing = false;

  function extractVideoId(input) {
    if (!input) return null;

    const match = input.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    );

    if (match) return match[1];

    if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) {
      return input.trim();
    }

    return null;
  }

  function playVideoById(id) {
    const iframe = document.getElementById("music-iframe");
    const player = document.getElementById("music-player");
    const btn = document.getElementById("music-toggle-btn");

    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;

    iframe.height = "100%";
    player.classList.remove("hidden");
    btn.textContent = "Stop Stream";
    playing = true;
  }

  function playSearch(query) {
    const iframe = document.getElementById("music-iframe");
    const player = document.getElementById("music-player");
    const btn = document.getElementById("music-toggle-btn");

    iframe.src = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}`;

    iframe.height = "200";
    player.classList.remove("hidden");
    btn.textContent = "Stop Stream";
    playing = true;
  }

  function stopVideo() {
    const iframe = document.getElementById("music-iframe");
    const player = document.getElementById("music-player");
    const btn = document.getElementById("music-toggle-btn");

    iframe.src = "";
    player.classList.add("hidden");
    btn.textContent = "Play Stream";
    playing = false;
  }

  window.musicPlayUrl = function () {
    const input = document.getElementById("music-url-input");
    const val = input.value.trim();

    if (!val) return;

    const id = extractVideoId(val);

    if (id) {
      playVideoById(id);
    } else {
      playSearch(val);
    }

    input.value = "";
  };

  window.musicToggle = function () {
    if (playing) {
      stopVideo();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("music-url-input");

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        window.musicPlayUrl();
      }
    });
  });
})();
