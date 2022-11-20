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
  Modal,
} from "antd";
import "./HomePage.css";
import { PresetColorTypes } from "antd/lib/_util/colors";
import { PresetStatusColorTypes } from "antd/es/_util/colors";
import { Navigate } from "react-router-dom";
import { Heading, AddTaskButton, PageSelection } from "../../components";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { addTask, app, db, auth, setTaskToDone } from "../../firebase";
// import { checkUserStatus } from "../../firebase";

export function HomePage() {
  // console.log(checkUserStatus());
  const [user, authLoading, authError] = useAuthState(auth);
  const [content, setContent] = React.useState({ content: "" });
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
    setTaskToDone(id);
    console.log(`checked = ${id}`);
  };

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const [modalLoading, setModalLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const showModal = (data) => {
    setContent({
      ...content,
      content: data,
    });
    setOpenModal(true);
  };
  const handleOk = () => {
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
      setOpenModal(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

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
      <PageSelection />

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
                    <Card
                      className="w-[90%] h-fit min-h-[75px] hover:cursor-pointer hover:shadow-xl transition-all"
                      key={task.id}
                      onClick={() => showModal(task.data())}
                    >
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

                      <Checkbox
                        className="task-fsn"
                        onClick={() => onCheckBoxTick(task.id)}
                      ></Checkbox>
                      <p className="task-fn-mark" disabled>
                        {" "}
                        Mark as done{" "}
                      </p>
                    </Card>
                  );
                })}
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

      <AddTaskButton />
      <Modal
        open={openModal}
        title={content.content.title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="submit"
            type="danger"
            className="bg-blue-500 text-white rounded-xl hover:bg-blue-300 border-blue-500 border-none hover:text-white"
            loading={loading}
            onClick={handleOk}
          >
            Edit
          </Button>,
        ]}
      >
        <p>{new Date(content.content.deadline).toString()}</p>
        <p>{content.content.description}</p>
      </Modal>
    </div>
  );
}
