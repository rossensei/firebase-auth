// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh4wV_scjd3AvEUuI3Y50ikmyUCQ2ih5I",
  authDomain: "midterm-8b2da.firebaseapp.com",
  projectId: "midterm-8b2da",
  storageBucket: "midterm-8b2da.appspot.com",
  messagingSenderId: "293040084985",
  appId: "1:293040084985:web:c824b40ea88c125e5d8f28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }