// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  query,
  getDocs,
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


export const editTask = async (docId, content) => {
  console.log("handle edit");
  onAuthStateChanged(auth, async (user) => {
    if (user){
      console.log("user valid");
      const uid = user.uid
      try {
        console.log("user id: ", uid)
        const docRef = await updateDoc(doc(db, "users", uid, "tasks", docId), 
          content
        )
        console.log("Document update with ID: ", docRef.id);
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
        console.log("Document set to done with ID: ", docRef.id);
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
        console.log("Document soft delete with ID: ", docRef.id);
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
        console.log("Document restore delete with ID: ", docRef.id);
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
        const docRef = await deleteDoc(doc(db, "users", uid, "tasks", docId));
        console.log("Document hard delete with ID: ", docRef.id);
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
  console.log("start function");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("still signed in");
      isSignedIn = true;
    } else {
      console.log("was signed out");
    }
  });
  
  return isSignedIn;

  // On dev env
  // return true
};

export const signInWithGoogle = async () => {
  const aauth = await signInWithRedirect(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   console.log("signed in success");
    //   const user = result.user;
    //   sessionStorage.setItem("user", JSON.stringify(user));
    //   // ...
    // })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   console.log("error occured when signed in");
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // }).finally(() => {
    //   console.log("end function");
    // });
    // console.log("auth", aauth);
};

export const signOutWithGoogle = async () => {
  await signOut(auth);
  sessionStorage.removeItem("user");
  console.log("signed out");
};
