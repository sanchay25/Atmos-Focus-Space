(function () {
  const STORAGE_KEY = "atmos_tasks";
  let tasks = [];

  try {
    tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (e) {
    tasks = [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function renderTasks() {
    const list = document.getElementById("task-list");
    const count = document.getElementById("tasks-count");
    count.textContent = tasks.filter((t) => !t.completed).length;

    list.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item";

      const checkBtn = document.createElement("button");
      checkBtn.className = "task-check" + (task.completed ? " checked" : "");
      if (task.completed) {
        checkBtn.innerHTML =
          '<svg class="w-3 h-3 text-[#08080a]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>';
      }
      checkBtn.onclick = () => {
        toggleTask(task.id);
      };

      const span = document.createElement("span");
      span.className =
        "text-sm flex-1 " +
        (task.completed ? "line-through text-[#7a839b]" : "text-[#d0d6e0]/80");
      span.textContent = task.text;

      const delBtn = document.createElement("button");
      delBtn.className = "task-delete";
      delBtn.innerHTML =
        '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      delBtn.onclick = () => {
        removeTask(task.id);
      };

      li.appendChild(checkBtn);
      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  function toggleTask(id) {
    tasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    save();
    renderTasks();
  }

  function removeTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    save();
    renderTasks();
  }

  window.addTask = function () {
    const input = document.getElementById("task-input");
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ id: Date.now(), text, completed: false });
    input.value = "";
    save();
    renderTasks();
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    document.getElementById("task-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") window.addTask();
    });
  });
})();
