import React from 'react';
import { Button } from 'antd';
import './LoginPage.css';
import { db, storage, auth, provider } from "../../firebase";
import {
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";


export function LoginPage() {
  const [count, setCount] = React.useState(0);
  const [uid, setUid] = React.useState(0);
  const handleClick = () => { 
    setCount(count + 1);
    console.log('Button clicked');
  }

  const handleSignIn = async () => {
    await signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      setUid(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    // for example
    <div className="Login">
      <div className="text">Remindเด้อ</div>
      <div className="mt-2 text">{count}</div>
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
      <Button className="test-button" type="primary" onClick={handleSignIn}>
        ลองกดสิ
      </Button>
      <p>{uid}</p>
    </div>
  );
}