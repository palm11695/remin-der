// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";
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
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_sorageBucket,
  messagingSenderId: process.env.REACT_APP_messageSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

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
        const docRef = await addDoc(collection(db, "users", uid, "tasks"), 
          content
        );
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


export const editTask = async (props) => {
  const { docId, content } = props;

  onAuthStateChanged(auth, async (user) => {
    if (user){
      const uid = user.uid
      try {
        await updateDoc(doc(db, "users", uid, "tasks", docId), 
          content
        )
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("user not valid");
    }
  })
  
}

export const setTaskToDone = async (docId) => {
  console.log("handle set to done");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("user valid");
      const uid = user.uid;
      try {
        console.log("user id: ", uid);
        const docRef = await getDoc(doc(db, "users", uid, "tasks", docId));
        let data = docRef.data();
        data.status = "done";
        console.log(data.status);
        await updateDoc(doc(db, "users", uid, "tasks", docId), 
          data,
        );
        // console.log("Pass add doc");
        // await deleteDoc(doc(db, "users", uid, "tasks", docId));
        // console.log("Document set to done with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("user not valid");
    }
  });
}

export const softDeleteTask = async (docId) => {
  console.log("handle soft delete");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("user valid");
      const uid = user.uid;
      try {
        console.log("user id: ", uid);
        const docRef = await getDoc(doc(db, "users", uid, "tasks", docId));
        let data = docRef.data()
        data.status = "deleted"
        console.log(data.status);
        await updateDoc(doc(db, "users", uid, "tasks", docId), 
          data
        );
        // console.log("Document soft delete with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("user not valid");
    }
  });
};

export const restoreDeleteTask = async (docId) => {
  console.log("handle restore delete");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("user valid");
      const uid = user.uid;
      try {
        console.log("user id: ", uid);
        const docRef = await getDoc(doc(db, "users", uid, "tasks", docId));
        let data = docRef.data();
        data.status = "ongoing";
        console.log(data.status);
        await updateDoc(doc(db, "users", uid, "tasks", docId), data);
        // console.log("Document restore delete with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("user not valid");
    }
  });
};

export const hardDeleteTask = async (docId) => {
  console.log("handle hard delete");
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("user valid");
      const uid = user.uid;
      try {
        console.log("user id: ", uid);
        await deleteDoc(doc(db, "users", uid, "tasks", docId));
        // console.log("Document hard delete with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      console.log("user not valid");
    }
  });
};

export const checkUserStatus = async () => {
  let isSignedIn = false;
  onAuthStateChanged(auth, (user) => {
    if (user) isSignedIn = true;
  });
  
  return isSignedIn;

  // On dev env
  // return true
};

export const signInWithGoogle = async () => {
  await signInWithRedirect(auth, provider)
};

export const signOutWithGoogle = async () => {
  await signOut(auth);
  sessionStorage.removeItem("user");
  console.log("signed out");
};
