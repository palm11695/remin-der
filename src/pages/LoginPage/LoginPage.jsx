import React from 'react';
import { Button } from 'antd';
import './LoginPage.css';
import { signInWithGoogle, signOutWithGoogle, checkUserStatus } from "../../firebase";


export function LoginPage() {

  checkUserStatus()

  const handleSignIn = async () => {
    signInWithGoogle()
  }

  const handleSignOut = async () => {
    signOutWithGoogle()
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