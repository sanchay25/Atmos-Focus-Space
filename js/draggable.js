(function () {
  const widgets = {};

  function initDraggable(widgetId) {
    const el = document.getElementById("widget-" + widgetId);
    if (!el) return;

    const handle = el.querySelector('[data-drag="' + widgetId + '"]');
    if (!handle) return;

    const stored = localStorage.getItem("atmos_pos_" + widgetId);
    const pos = stored ? JSON.parse(stored) : { x: 0, y: 0 };
    widgets[widgetId] = pos;
    el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

    let dragging = false;
    let offset = { x: 0, y: 0 };

    handle.addEventListener("mousedown", (e) => {
      dragging = true;
      offset.x = e.clientX - pos.x;
      offset.y = e.clientY - pos.y;
      el.style.transition = "none";
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1.02)`;
    });

    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      pos.x = e.clientX - offset.x;
      pos.y = e.clientY - offset.y;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1.02)`;
    });

    window.addEventListener("mouseup", () => {
      if (!dragging) return;
      dragging = false;
      el.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
      el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1)`;
      localStorage.setItem("atmos_pos_" + widgetId, JSON.stringify(pos));
    });
  }

  window.initDraggable = initDraggable;
})();
