const users = {
  "Rajko": "201290",
  "Tinkara": "091001",
  "Daniel": "170192",
  "Magda": "270902",
  "Nina":  "210802"
};

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("message");

  if (users[user] && users[user] === pass) {
    msg.style.color = "green";
    msg.textContent = "Anmeldung erfolgreich, du wirst weitergeleitet :)";

    // 3 Sekunden Text anzeigen (nur optisch – kein Abbruch notwendig)
    setTimeout(() => {
      msg.textContent = "";
    }, 3000);

    // 2 Sekunden warten, dann Seite wechseln
    setTimeout(() => {
      //localStorage.setItem("currentUser", user); // optional
      window.location.href = "dashboard.html";
    }, 2000);
  } else {
    msg.style.color = "red";
    msg.textContent = "Benutzername oder Passwort falsch.";
  }
}