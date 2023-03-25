// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { message } from "@tauri-apps/api/dialog";

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
    login(userCredentials).then(() => {
      setTimeout(() => {
        (loginForm as HTMLFormElement).reset();
      }, 2000);
    });
  });

  logoutButton?.addEventListener("click", (e) => {
    e.preventDefault();

    logout();
  });
});

const login = async (userCredentials: { email: string; password: string }) => {
  const loginSpinner = document.getElementById("login-spinner");

  // show spinner
  loginSpinner?.classList.remove("hidden");

  signInWithEmailAndPassword(
    auth,
    userCredentials.email,
    userCredentials.password
  )
    .then((userCredential) => {
      // hide spinner
      loginSpinner?.classList.add("hidden");

      // Signed in
      USER = userCredential.user;

      // user redirect
      window.location.replace("landing.html");
    })
    .catch(async (error) => {
      loginSpinner?.classList.add("hidden");

      switch (error.message) {
        case "Firebase: Error (auth/user-not-found).":
          await message(
            "This user does not exist, check your email",
            "Email not Found"
          );

          break;
        case "Firebase: Error (auth/wrong-password).":
          await message("Check your password and try again", "Wrong Password");
        case "Firebase: Error (auth/too-many-attempts).":
          await message(
            "You have tried too many times, try again later or contact admin for password reset",
            "Too many tries"
          );
        default:
          console.log("shit");
      }
    });
};

const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.replace("index.html");
    })
    .catch(async (error) => {
      await message(error.message, "Unexpected Error");
    });
};
