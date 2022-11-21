import React from "react";
import { Button } from "antd";
import {
  signInWithGoogle,
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
        <img src="logo192.png" alt="Reminder Logo" className="h-[5rem] mr-2 drop-shadow-lg"/>
        <div className="text-center text-xl font-bold">Remind-เด้อ</div>
        {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
        <Button
          className="border-white bg-white w-fit text-white h-[50px] shadow"
          type="primary"
          onClick={handleSignIn}
        >
          <div className="flex flex-row items-center justify-center gap-2 text-gray-800 font-medium">
            <img src="icons8-google-48.png" alt="Google Icon" className="h-[24px] drop-shadow-lg"/>
            Sign in with Google
          </div>
        </Button>
      </div>
    </div>
  );
}
