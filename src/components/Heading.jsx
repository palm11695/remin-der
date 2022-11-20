import React from 'react'
import {
  signOutWithGoogle,
} from "../firebase";
import { Button } from 'antd';

export function Heading(){
    return (
        <div className="p-8 pb-2">
            <div className="flex flex-row w-full items-center justify-between">
                <h1 className="font-bold text-xl">Remind-เด้อ</h1>
                <Button
                    className="bg-red-500 text-white rounded-xl hover:bg-red-300 border-red-500 border-none hover:text-white"
                    type="primary"
                    onClick={signOutWithGoogle}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}