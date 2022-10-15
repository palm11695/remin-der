// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY8A-cNp3N2hqZ5FccLbHBR53ZSEz-ojI",
  authDomain: "reminder-se.firebaseapp.com",
  projectId: "reminder-se",
  storageBucket: "reminder-se.appspot.com",
  messagingSenderId: "703603214281",
  appId: "1:703603214281:web:31f8911434405c637b4a18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
