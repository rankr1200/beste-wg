const users = ["Rajko", "Tinkara", "Daniel", "Magda", "Nina"];
const tasks = ["Bad", "Küche", "Klos", "Aufwaschen", "Staubsaugen"];
const totalWeeks = 5; // vergangene Woche + aktuelle + 3 zukünftige

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  alert("Bitte zuerst einloggen!");
  window.location.href = "index.html";
}
document.getElementById("userLabel").textContent = `Angemeldet als: ${currentUser}`;

function getLastMonday() {
  const today = new Date();
  const day = today.getDay(); // 0=So, 1=Mo
  const diffToLastMonday = day === 0 ? -6 - 7 : 1 - day - 7;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() + diffToLastMonday);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}

function formatDate(date) {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

const container = document.getElementById("putzplan");
const startDate = getLastMonday();

for (let w = 0; w < totalWeeks; w++) {
  const weekStart = new Date(startDate);
  weekStart.setDate(startDate.getDate() + w * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = weekEnd < today;

  const weekDiv = document.createElement("div");
  weekDiv.className = "week";
  if (isPast) weekDiv.classList.add("past-week");

  const rotatedTasks = [...tasks.slice(w % tasks.length), ...tasks.slice(0, w % tasks.length)];

  const listItems = users.map((user, i) => {
    const task = rotatedTasks[i];
    const taskId = `w${w - 1}_u${i}`;
    const isCurrentUser = user === currentUser;
    const checked = localStorage.getItem(taskId) === "true";

    return `
      <li>
        <span class="task-label"><strong>${user}:</strong> ${task}</span>
        <input type="checkbox" id="${taskId}" ${checked ? "checked" : ""} ${!isCurrentUser || isPast ? "disabled" : ""}>
        <span id="${taskId}_done" class="task-complete" style="display:${checked ? "inline" : "none"};">✔️</span>
      </li>
    `;
  }).join("");

  weekDiv.innerHTML = `
    <h2>Woche von ${formatDate(weekStart)} bis ${formatDate(weekEnd)}</h2>
    <ul>${listItems}</ul>
  `;
  container.appendChild(weekDiv);
}

document.querySelectorAll("input[type='checkbox']").forEach(cb => {
  cb.addEventListener("change", function () {
    localStorage.setItem(this.id, this.checked);
    const checkmark = document.getElementById(this.id + "_done");
    if (checkmark) checkmark.style.display = this.checked ? "inline" : "none";
  });
});
