// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2scMuF18RmlJwWrDz9hjnKROO1C9_4FM",
  authDomain: "wise-wash-fb327.firebaseapp.com",
  projectId: "wise-wash-fb327",
  storageBucket: "wise-wash-fb327.appspot.com",
  messagingSenderId: "595257934278",
  appId: "1:595257934278:web:36da71d206ff7ae46b72c7",
  measurementId: "G-H401K5ZTY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var USER: Auth | User;

// Firebase auth
const auth = getAuth();
// END FIREBASE INIT

window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const logoutButton = document.getElementById("logout-button");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const userCredentials = {
      email: (document.getElementById("login-email") as HTMLInputElement)
        ?.value,
      password: (document.getElementById("login-password") as HTMLInputElement)
        ?.value,
    };
    // call login user function
    login(userCredentials);
  });

  logoutButton?.addEventListener("click", (e) => {
    e.preventDefault();

    logout();
  });
});

const login = (userCredentials: { email: string; password: string }) => {
  signInWithEmailAndPassword(
    auth,
    userCredentials.email,
    userCredentials.password
  )
    .then((userCredential) => {
      // Signed in
      USER = userCredential.user;

      // user redirect
      window.location.replace("landing.html");
    })
    .catch((error) => {
      console.log(error);
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.replace("index.html");
    })
    .catch((error) => {
      console.log(error);
    });
};
