import React from 'react';
import { Button } from 'antd';
import './LoginPage.css';
import { db, storage, auth, provider } from "../../firebase";
import {
  signInWithRedirect,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";


export function LoginPage() {

  onAuthStateChanged(auth, (user) => {
    if (user){
      console.log('still signed in');
    } else {
      console.log('was signed out');
    }
  })

  const handleSignIn = async () => {
    await signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        console.log('signed in success');
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        console.log('error occured when signed in');
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleSignOut = async () => {
    await signOut(auth)
    console.log('signed out');
  }


  return (
    // for example
    <div className="Login">
      <div className="text">Remindเด้อ</div>
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
      <button className='button p-4 border-blue bg-blue-700 w-[150px] rounded mt-4 text-white block' onClick={handleSignIn}>Sign In</button>
      <button className='button p-4 border-red bg-red-700 w-[150px] rounded mt-4 text-white' onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}