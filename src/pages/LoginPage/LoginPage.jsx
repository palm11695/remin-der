import React, {useEffect} from "react";
import { Button } from "antd";
import "./LoginPage.css";
import {
  signInWithGoogle,
  signOutWithGoogle,
  checkUserStatus,
} from "../../firebase";
import { Navigate } from "react-router-dom";

export function LoginPage() {
  // const auth = checkUserStatus().then((e) => { return e })
  const auth = sessionStorage.getItem("user");
  console.log(auth);

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
  };

  return (
    // for example
    <div className="w-full h-[100vh]">
      {auth && <Navigate to="/" />}
      <div className="flex flex-col gap-2 max-w-sm mx-auto items-center justify-center h-full">
        <div className="text-center text-xl font-bold">Remind เด้อ</div>
        {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
        <Button
          className="p-4 border-blue bg-blue-700 w-[150px] rounded text-white h-[50px]"
          type="primary"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
