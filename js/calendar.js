(function () {
  let currentDate = new Date();
  let selectedDate = null;

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    document.getElementById("cal-month-label").textContent =
      monthNames[month] + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = "";

    for (let i = 0; i < firstDay; i++) {
      html += '<div class="cal-day empty"></div>';
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === d;
      const isSelected =
        selectedDate &&
        selectedDate.getFullYear() === year &&
        selectedDate.getMonth() === month &&
        selectedDate.getDate() === d;
      let cls = "cal-day";
      if (isToday) cls += " today";
      if (isSelected) cls += " selected";
      html += '<div class="' + cls + '" data-day="' + d + '">' + d + "</div>";
    }

    document.getElementById("cal-grid").innerHTML = html;

    document
      .querySelectorAll("#cal-grid .cal-day:not(.empty)")
      .forEach(function (el) {
        el.addEventListener("click", function () {
          selectedDate = new Date(year, month, parseInt(el.dataset.day));
          renderCalendar();
        });
      });
  }

  window.calPrev = function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  };

  window.calNext = function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderCalendar();
  });
})();
