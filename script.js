const listContainer = document.getElementById("list-container");
const inputBox = document.getElementById("input-box");
const darkModeButton = document.querySelector(".dark-mode-toggle");

// Dodavanje zadatka
function addTask() {
    const taskText = inputBox.value.trim();
    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = taskText;

    const span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);

    li.classList.add("fade-in");
    listContainer.appendChild(li);

    inputBox.value = "";
    saveTasks();
}

// Uklanjanje i čekiranje zadataka
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        const parent = e.target.parentElement;
        parent.classList.add("fade-out");
        setTimeout(() => {
            parent.remove();
            saveTasks();
        }, 300);
    }
});

// Čuvanje i prikazivanje zadataka
function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

// Dark Mode funkcionalnost
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);
});

// Postavljanje Dark Mode-a po učitavanju
function initializeDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }
}

loadTasks();
initializeDarkMode();