import React from 'react';
import { Button } from "antd";

export function AddTaskButton() {
  return (
    <div className="fixed bottom-4 w-full max-w-sm">
      <div className="flex flex-col items-center">
        <a href="/add">
          <Button
            className="box-border border-black h-11 sm:max-w-sm w-80 inline-block px-6 py-2.5 bg-black text-white rounded-lg"
            type="primary"
          >
            + Add new Task
          </Button>
        </a>    
      </div>
    </div>
  );
}