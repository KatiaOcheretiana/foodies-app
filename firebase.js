// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "foodies-app-3c66e.firebaseapp.com",
  databaseURL:
    "https://foodies-app-3c66e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "foodies-app-3c66e",
  storageBucket: "foodies-app-3c66e.appspot.com",
  messagingSenderId: "355010467818",
  appId: "1:355010467818:web:7b4d4a1fd8bf1ff8f2c493",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
