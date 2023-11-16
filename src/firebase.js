// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pillpall-35c8e.firebaseapp.com",
  projectId: "pillpall-35c8e",
  storageBucket: "pillpall-35c8e.appspot.com",
  messagingSenderId: "861230899835",
  appId: "1:861230899835:web:c3c9c55e05bc3c3c9ab8de"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);