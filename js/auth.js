const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function registerUser() {
  const email = registerEmail.value;
  const password = registerPassword.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {
      return db.collection("users").doc(user.user.uid).set({
        email: email,
        prizes: []
      });
    })
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert(err.message));
}

function loginUser() {
  auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => alert(err.message));
}

function logoutUser() {
  auth.signOut().then(() => window.location.href = "login.html");
}

auth.onAuthStateChanged(user => {
  if (!user && location.pathname.includes("dashboard")) {
    window.location.href = "login.html";
  }
});      return db.collection("users").doc(user.uid).set({
        email: email,
        role: "user",
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

/* ========= LOGIN USER ========= */
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

/* ========= LOGOUT USER ========= */
function logoutUser() {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}

/* ========= PROTECT DASHBOARD ========= */
auth.onAuthStateChanged((user) => {
  if (!user && window.location.pathname.includes("dashboard")) {
    window.location.href = "login.html";
  }
});
