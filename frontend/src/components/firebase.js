// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE5GYK0s-ZCo3r_uIe1KEGKwc3SUH0QdQ",
  authDomain: "mernfolio.firebaseapp.com",
  projectId: "mernfolio",
  storageBucket: "mernfolio.firebasestorage.app",
  messagingSenderId: "456646304404",
  appId: "1:456646304404:web:fe19c0e244e35cb9620a81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth
const auth = getAuth(app);

export { auth };
