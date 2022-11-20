import React, { useState, useRef, useEffect } from "react";
import {
  Divider,
  Cascader,
  Button,
  Card,
  Tag,
  Checkbox,
  Input,
  Tooltip,
} from "antd";
import { PresetStatusColorTypes } from "antd/es/_util/colors";
import { Navigate } from "react-router-dom";
import { Heading, AddTaskButton, PageSelection } from "../../components";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { addTask, app, db, auth, setTaskToDone } from "../../firebase";
// import { checkUserStatus } from "../../firebase";

export function FinishPage() {
  // console.log(checkUserStatus());
  const [user, authLoading, authError] = useAuthState(auth);
  const [content, setContent] = React.useState("");
  const [tasks, loading, error] = useCollection(
    query(
      collection(db, "users", user.uid, "tasks"),
      where("status", "==", "done")
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const { Meta } = Card;

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
    <div className="w-full h-full max-w-sm">
      <Heading />
      <PageSelection currentPage="Finished" />

      <div className="m-4">
        <Divider orientation="left">Filter</Divider>
        <div className="flex flex-row flex-wrap gap-2 border rounded-md p-4 overflow-y-scroll m-4">
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
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
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && <Tag onClick={showInput}>New Tag +</Tag>}
        </div>
      </div>

      <div className="m-4">
        <Divider orientation="left">Tasks</Divider>
        <div className="w-full max-h-[28rem] overflow-y-scroll">
          <div className="flex flex-col gap-2 items-center justify-center">
            {tasks && (
              <>
                {tasks.docs.map((task) => {
                  return (
                    <Card className="w-[90%] h-fit min-h-[75px]" key={task.id}>
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
                        <>
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
                        </>
                      )}
                    </Card>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
