/************************************************
 * LuckyNest - Firebase Auth Logic
 * Author: LuckyNest Project
 ************************************************/

/* ========= FIREBASE CONFIG ========= */
/* REPLACE the values below with your Firebase keys */
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

/* ========= INITIALIZE FIREBASE ========= */
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* ========= REGISTER USER ========= */
function registerUser() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      return db.collection("users").doc(user.uid).set({
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
