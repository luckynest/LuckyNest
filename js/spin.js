const prizes = [
  "Free Spin",
  "$5 Gift Card",
  "$10 Gift Card",
  "Try Again",
  "Lucky Bonus"
];

function spinWheel() {
  const user = auth.currentUser;
  if (!user) return;

  const prize = prizes[Math.floor(Math.random() * prizes.length)];
  document.getElementById("result").innerText = "You won: " + prize;

  db.collection("users").doc(user.uid).update({
    prizes: firebase.firestore.FieldValue.arrayUnion(prize)
  });

  loadPrizes();
}

function loadPrizes() {
  const user = auth.currentUser;
  if (!user) return;

  db.collection("users").doc(user.uid).get().then(doc => {
    const list = document.getElementById("prizeList");
    list.innerHTML = "";
    doc.data().prizes.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p;
      list.appendChild(li);
    });
  });
}

auth.onAuthStateChanged(user => {
  if (user) loadPrizes();
});
