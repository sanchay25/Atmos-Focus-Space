(function () {
  const BACKGROUNDS = [
    "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&q=80&w=2070",
    "https://wallpapercave.com/wp/wp8970853.png",
    "https://images.unsplash.com/photo-1644703255665-46a2c8d28d32?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media.gettyimages.com/id/1448291104/video/dark-grunge-background-aged-paper-texture.jpg?s=640x640&k=20&c=GDx5T3eBY3jERXGoSM7AJHG0YO3KfQytkFaoqeLF7o0=",
  ];

  let bgIndex = parseInt(localStorage.getItem("atmos_bg") || "0", 10);
  let customBg = localStorage.getItem("atmos_custom_bg") || null;
  let widgetState = { timer: true, tasks: true, music: true, calendar: true };

  try {
    const stored = localStorage.getItem("atmos_widgets");
    if (stored) widgetState = { ...widgetState, ...JSON.parse(stored) };
  } catch (e) {}

  function setBackground(url) {
    const el = document.getElementById("bg-image");
    el.style.opacity = "0";
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = "url(" + url + ")";
      el.style.opacity = "1";
    };
    img.onerror = () => {
      el.style.opacity = "1";
    };
    img.src = url;
  }

  function loadBackground() {
    if (customBg) {
      setBackground(customBg);
    } else {
      setBackground(BACKGROUNDS[bgIndex % BACKGROUNDS.length]);
    }
  }

  window.nextBackground = function () {
    customBg = null;
    localStorage.removeItem("atmos_custom_bg");
    bgIndex = (bgIndex + 1) % BACKGROUNDS.length;
    localStorage.setItem("atmos_bg", String(bgIndex));
    loadBackground();
  };

  window.toggleWallpaperPanel = function () {
    const panel = document.getElementById("wallpaper-panel");
    panel.classList.toggle("hidden");
  };

  window.applyWallpaperUrl = function () {
    const url = document.getElementById("wallpaper-url").value.trim();
    if (!url) return;
    customBg = url;
    localStorage.setItem("atmos_custom_bg", url);
    loadBackground();
    document.getElementById("wallpaper-url").value = "";
  };

  window.applyWallpaperFile = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      customBg = ev.target.result;
      localStorage.setItem("atmos_custom_bg", customBg);
      loadBackground();
    };
    reader.readAsDataURL(file);
  };

  window.resetWallpaper = function () {
    customBg = null;
    localStorage.removeItem("atmos_custom_bg");
    loadBackground();
  };

  function applyWidgetVisibility() {
    ["timer", "tasks", "music", "calendar"].forEach((id) => {
      const widget = document.getElementById("widget-" + id);
      const btn = document.getElementById("btn-" + id);
      if (widget) widget.style.display = widgetState[id] ? "" : "none";
      if (btn) {
        if (widgetState[id]) btn.classList.add("active");
        else btn.classList.remove("active");
      }
    });
  }

  window.toggleWidget = function (id) {
    widgetState[id] = !widgetState[id];
    localStorage.setItem("atmos_widgets", JSON.stringify(widgetState));
    applyWidgetVisibility();
  };

  window.toggleFullscreen = function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  document.addEventListener("fullscreenchange", () => {
    const btn = document.getElementById("btn-fullscreen");
    const icon = document.getElementById("fs-icon");
    if (document.fullscreenElement) {
      btn.classList.add("active");
      icon.innerHTML =
        '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/>';
    } else {
      btn.classList.remove("active");
      icon.innerHTML =
        '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>';
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadBackground();
    applyWidgetVisibility();
    initDraggable("timer");
    initDraggable("tasks");
    initDraggable("music");
    initDraggable("calendar");
  });
})();
