// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdBB9Urey0rMnE02blkiRGASCg_1eoRZM",
  authDomain: "gardening-a-10.firebaseapp.com",
  projectId: "gardening-a-10",
  storageBucket: "gardening-a-10.firebasestorage.app",
  messagingSenderId: "450707675860",
  appId: "1:450707675860:web:c56ca6bc87ec97d6643941",
  measurementId: "G-184QGMB4LG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
