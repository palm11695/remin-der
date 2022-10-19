import React, { useEffect } from 'react';
import { Button } from 'antd';
import './ItemPage.css';
import { addTask, checkUserStatus, getAllTask } from "../../firebase";
export function ItemPage() {

  const [content, setContent] = React.useState('')
  const [allTask, setAllTask] = React.useState([])

 useEffect(() => {
    (async () => {
      const _allTask = await getAllTask()
      setAllTask(_allTask)
      console.log(allTask);
    })();
  }, []);

  checkUserStatus()

    const handleAdd = async () => {
      await addTask({content: content})
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
      <p className=' mt-4'>{JSON.stringify(allTask)}</p>
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
    </div>
  );
}
