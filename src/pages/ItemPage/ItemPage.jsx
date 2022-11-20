import React, { useEffect } from 'react';
import { Button } from 'antd';
import './ItemPage.css';
import { getFirestore, collection, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { addTask, app, db, auth } from '../../firebase';

// To be Deleted


export function ItemPage() {
  
  const [user, authLoading, authError] = useAuthState(auth);
  const [content, setContent] = React.useState('')
  const [value, loading, error] = useCollection(
    collection(db, "users", user.uid, "tasks"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

    const handleAdd = async () => {
      await addTask({content: content})
    }

    const handleTextChange = (e) => {
      setContent(e.target.value)
    }

  return (
    // for example
    <div className="Login w-full p-20">
      <div className="">
        <label className="block bold">Data no.1</label>
        <textarea
          className="border border-black block"
          value={content}
          onChange={(e) => handleTextChange(e)}
        ></textarea>
        <button
          className="button p-4 border-blue bg-blue-700 w-[150px] rounded mt-4 text-white"
          onClick={handleAdd}
        >
          Submit
        </button>
      </div>
      {/* <p className=" mt-4">{JSON.stringify(value.docs)}</p> */}
      {value && (
        <span>
          Collection:{" "}
          {value.docs.map((doc) => (
            <React.Fragment key={doc.id}>
              {doc.id}
              {/* {doc.data()} */}
              {JSON.stringify(doc.data())},{"\n\n"}
              {/* {doc.data().content} {"\n\n"} */}
            </React.Fragment>
          ))}
        </span>
      )}
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
    </div>
  );
}
