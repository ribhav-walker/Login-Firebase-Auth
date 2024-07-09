// Firebase Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { doc, getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7-4EcRT-HqzN_ctyEa3CVuqIfLGoDw_4",
    authDomain: "event-12e61.firebaseapp.com",
    projectId: "event-12e61",
    storageBucket: "event-12e61.appspot.com",
    messagingSenderId: "1038833741364",
    appId: "1:1038833741364:web:13ab1399195283f1406461",
    measurementId: "G-BDQ3MHWJZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const Name = document.getElementById('Name').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                Name: Name
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("error writing document", error);

                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            }
            else {
                showMessage('unable to create User', 'signUpMessage');
            }
        })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('login is successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'homepage.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        })
})

//Reset Password
const auth = getAuth();
const reset = document.getElementById("reset");
reset.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
        .then(() => {

            showMessage('Email Sent !!', 'ResetMessage');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showMessage(errorMessage, 'ResetMessage');
        });
})