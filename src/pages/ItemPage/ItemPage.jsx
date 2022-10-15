import React from 'react';
import { Button } from 'antd';
import './ItemPage.css';
import { db, storage, auth, provider } from "../../firebase";
  import {
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged
  } from "firebase/auth";

  import { collection, addDoc } from "firebase/firestore"; 


export function ItemPage() {
  const [count, setCount] = React.useState(0);
      const [uid, setUid] = React.useState('');
  // const uid = "cXD2gTry9cZgph3ybbnPSUDnYNG3";
  const [content, setContent] = React.useState('')
  const handleClick = () => { 
    setCount(count + 1);
    console.log('Button clicked');
  }

  const auth = getAuth();
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // console.log(user, '');
    })
    .catch((error) => {
      // Handle Errors here.
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     console.log(uid);
    //     setUid(uid);
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });

    const handleAdd = async () => {

      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          
        } else {
          // User is signed out
          // ...
        }
      });

      try {
        console.log(uid);
        const docRef = await addDoc(collection(db, "items"), {
          _id: uid,
          content: content,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.log(e.message);
      }
    }


    const handleTextChange = (e) => {
      setContent(e.target.value)
    }

  return (
    // for example
    <div className="Login w-full p-20">
      <div className=''>
        <label className='block bold'>Data no.1</label>
        <textarea className='border border-black block' value={content} onChange={(e) => handleTextChange(e)}></textarea>
        <button className='button p-4 border-blue bg-blue-700 w-[150px] rounded mt-4 text-white' onClick={handleAdd}>Submit</button>
      </div>
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
      <p>{uid}</p>
    </div>
  );
}