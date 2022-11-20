import React, {useState, useRef, useEffect} from "react";
import { Divider, Cascader, Button, Card, Tag, Checkbox, Input, Tooltip } from "antd";
import "./HomePage.css";
import { PresetColorTypes } from "antd/lib/_util/colors";
import { PresetStatusColorTypes } from "antd/es/_util/colors";
import { Navigate } from 'react-router-dom'
import Heading from '../../components/Heading'
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { addTask, app, db, auth, setTaskToDone } from "../../firebase";
// import { checkUserStatus } from "../../firebase";

export function HomePage() {
  // console.log(checkUserStatus());
  const [user, authLoading, authError] = useAuthState(auth);
  const [content, setContent] = React.useState("");
  const [tasks, loading, error] = useCollection(
    query(
      collection(db, "users", user.uid, "tasks"),
      where("status", "==", "ongoing")
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  
  const { Meta } = Card;
  const onCheckBoxTick = (id) => {
    setTaskToDone(id)
    console.log(`checked = ${id}`);
  };

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <div className="w-full p-8 h-[100vh]">
      <div className="flex flex-col max-w-sm mx-auto gap-6 h-full">
        <Heading />
        <div className="flex flex-row justify-center items-center gap-2">
          <a href="/">
            <Button>Pending</Button>
          </a>
          <a href="/finish">
            <Button>Finished</Button>
          </a>
          <a href="/delete">
            <Button>Recently Deleted</Button>
          </a>
        </div>
        <div>
          <Divider orientation="left">Filter</Divider>
          <div className="flex flex-row flex-wrap gap-2 border p-4 h-[8vh] overflow-y-scroll">
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    className="h-fit"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  className=""
                  key={tag}
                  closable
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            {inputVisible && (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                className="h-fit"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="h-fit" onClick={showInput}>
                New Tag +
              </Tag>
            )}
          </div>
        </div>

        <div>
          <Divider orientation="left">Tasks</Divider>
          {/* Why it cannot display 2 top card?? */}
          <div className="w-full flex flex-col gap-2 items-center justify-center h-[50vh] overflow-y-scroll">
            {tasks && (
              <>
                {tasks.docs.map((task) => (
                  <React.Fragment key={task.id}>
                    {task.data().title && (
                    <Card className="w-[90%] h-fit transition-all ease-in-out min-h-[75px]">
                      <Meta
                        title={task.data().title}
                        description={`${
                          new Date(task.data().deadline).getDate() +
                          "/" +
                          new Date(task.data().deadline).getMonth() +
                          "/" +
                          new Date(task.data().deadline).getFullYear()
                        } - ${
                          new Date(task.data().deadline).getHours() +
                          ":" +
                          new Date(task.data().deadline).getMinutes()
                        }`}
                      />
                      {task.data().tags && (
                        <div className="h-8">

                          {task.data().tags.map((tag) => {
                            return (
                              <Tag
                                className="mt-2"
                                color={
                                  PresetStatusColorTypes[
                                    Math.round(Math.random() * 100, 0) % 13
                                  ]
                                }
                              >
                                {tag}
                              </Tag>
                            );
                          })}
                        </div>

                      )}

                      <Checkbox
                        className="task-fsn"
                        onChange={() => onCheckBoxTick(task.id)}
                      ></Checkbox>
                      <text className="task-fn-mark" disabled>
                        {" "}
                        Mark as done{" "}
                      </text>
                    </Card>
                    )}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>
        </div>
        <a href="/add">
          <Button
            className="box-border h-11 sm:max-w-sm w-full inline-block px-6 py-2.5 bg-black text-white rounded-lg fixed bottom-4"
            type="primary"
          >
            + Add new Task
          </Button>
        </a>
      </div>
    </div>
  );
}
