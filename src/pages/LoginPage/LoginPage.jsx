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
          className=" border-blue bg-blue-700 w-[150px] rounded-lg text-white h-[50px]"
          type="primary"
          onClick={handleSignIn}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            Sign In with
            <img src="icons8-google-48.png" className="h-[24px]"/>
          </div>
        </Button>
      </div>
    </div>
  );
}
