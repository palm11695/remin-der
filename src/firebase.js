// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
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

export const addTask = async (content) => {
  console.log("handle add");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("user valid");
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      try {
        console.log("user id: ", uid);
        const docRef = await addDoc(collection(db, "users", uid, "task"), {
          content: content,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      // User is signed out
      console.log("user not valid");
    }
  });
};

export const checkUserStatus = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("still signed in");
    } else {
      console.log("was signed out");
    }
  });
};

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      console.log("signed in success");
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      console.log("error occured when signed in");
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signOutWithGoogle = async () => {
  await signOut(auth);
  console.log("signed out");
};
