import React from 'react';
import { Button } from 'antd';
import './ItemPage.css';
import { db, auth } from "../../firebase";
  import {
    getAuth,
    getRedirectResult,
    GoogleAuthProvider,
    onAuthStateChanged
  } from "firebase/auth";

  import { collection, addDoc } from "firebase/firestore"; 


export function ItemPage() {

  const [content, setContent] = React.useState('')
  // const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
    if (user){
      console.log('still signed in');
    } else {
      console.log('was signed out');
    }
  })

    const handleAdd = async () => {
      console.log("handle add");
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log("user valid");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          try {
            console.log(uid);
            const docRef = await addDoc(collection(db, "users", uid, "task"), {
              content: content
            })
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.log(e.message);
          }

        } else {
          // User is signed out
          console.log("user not valid");
        }
      });

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
    </div>
  );
}