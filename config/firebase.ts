// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyhM5L-qnCpLbAjOmW2WNlOY2Z0QyfPgQ",
  authDomain: "posts-firebase-dc87e.firebaseapp.com",
  projectId: "posts-firebase-dc87e",
  storageBucket: "posts-firebase-dc87e.appspot.com",
  messagingSenderId: "858214790724",
  appId: "1:858214790724:web:95392caedeb9d439982e11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
