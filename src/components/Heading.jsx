import React from 'react'
import {
  signInWithGoogle,
  signOutWithGoogle,
  checkUserStatus,
} from "../firebase";
import { Button } from 'antd';
import { Navigate } from 'react-router-dom'

export default function Heading(){
    // const auth = sessionStorage.getItem('user')
    return (
        <div>
            {/* {!auth && <Navigate to="/login" />} */}
            <div className="flex flex-row w-full items-center justify-between">
            <text className="font-bold text-xl">Remind-เด้อ</text>
            <Button
                className="bg-red-700 text-white rounded-xl hover:bg-red-500 border-red-700 border-none hover:text-white"
                type="primart"
                onClick={signOutWithGoogle}
            >
                Logout
            </Button>
            </div>
        </div>
    )
}