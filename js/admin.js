// Load all users (ADMIN ONLY)
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Simple admin check (email-based)
  if (user.email !== "ADMIN_EMAIL_HERE") {
    alert("Access denied");
    window.location.href = "dashboard.html";
    return;
  }

  loadUsers();
});

function loadUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  db.collection("users").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${data.email}</strong><br>
        Prizes: ${(data.prizes || []).join(", ") || "None"}
      `;

      userList.appendChild(li);
    });
  });
}
