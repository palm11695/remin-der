import React from 'react';
import { Button } from 'antd';
import './ItemPage.css';
import { addTask, checkUserStatus } from "../../firebase";
export function ItemPage() {

  const [content, setContent] = React.useState('')

  checkUserStatus()

    const handleAdd = async () => {
      addTask(content)
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
    </div>
  );
}
