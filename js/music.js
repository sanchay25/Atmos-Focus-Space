(function () {
  let playing = false;

  function extractVideoId(url) {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtube.com")) {
        const v = parsed.searchParams.get("v");
        if (v && v.length === 11) return v;

        const match = parsed.pathname.match(
          /\/(embed|shorts|v)\/([a-zA-Z0-9_-]{11})/,
        );
        if (match) return match[2];
      }

      if (parsed.hostname.includes("youtu.be")) {
        const id = parsed.pathname.slice(1);
        if (id.length === 11) return id;
      }
    } catch (e) {
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
    }

    return null;
  }

  function playVideo(id) {
    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");

    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&loop=1&playlist=${id}&controls=0&modestbranding=1`;

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
      const id = extractVideoId(select.value);

      if (!id) {
        alert("Invalid preset video");
        return;
      }

      playVideo(id);
    }
  };

  window.musicPlayUrl = function () {
    const input = document.getElementById("music-url-input");
    const val = input.value.trim();
    if (!val) return;

    const id = extractVideoId(val);

    if (!id) {
      alert("Invalid YouTube link");
      return;
    }

    playVideo(id);
    input.value = "";
  };

  window.musicSearch = function () {
    const input = document.getElementById("music-url-input");
    const val = input.value.trim();
    if (!val) return;

    const player = document.getElementById("music-player");
    const iframe = document.getElementById("music-iframe");
    const btn = document.getElementById("music-toggle-btn");

    const searchQuery = encodeURIComponent(val);

    iframe.src = `https://www.youtube.com/embed?listType=search&list=${searchQuery}`;

    player.classList.remove("hidden");
    iframe.height = "200";
    btn.textContent = "Stop Stream";
    playing = true;

    input.value = "";
  };

  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("music-select");
    const input = document.getElementById("music-url-input");

    if (select) {
      select.addEventListener("change", () => {
        if (playing) {
          stopVideo();
          const id = extractVideoId(select.value);
          if (id) playVideo(id);
        }
      });
    }

    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          window.musicPlayUrl();
        }
      });
    }
  });
})();
