import React, { useState, useRef, useEffect } from "react";
import {
  Divider,
  Button,
  Card,
  Tag,
  Checkbox,
  Input,
  Tooltip,
  Modal,
} from "antd";
import "./HomePage.css";
import { PresetStatusColorTypes } from "antd/es/_util/colors";
import { useNavigate } from "react-router-dom";
import { Heading, AddTaskButton, PageSelection } from "../../components";
import { DateTimeFormatter } from "../../utils";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  db,
  auth,
  setTaskToDone,
  softDeleteTask,
} from "../../firebase";
import "medium-editor/dist/css/themes/default.css";
import "medium-editor/dist/css/medium-editor.css";
import Editor from "react-medium-editor";

export function HomePage() {
  const [user] = useAuthState(auth);
  const uid = user? user.uid : null;
  const [content, setContent] = React.useState("");
      const [tasks, loading] = useCollection(
        query(
          collection(db, "users", uid, "tasks"),
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

  const [setModalLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  
  const showModal = (data, id) => {
    setContent({
      ...content,
      content: { 
        "id": id, 
        "data": data },
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
  const handleDelete = (id) => {
    setOpenModal(false);
    softDeleteTask(id);
  };

  const handleEditTask = () => {
    navigate('/edit', { state: { content } })
  }

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
    if (inputValue && tags) {
      if (tags.indexOf(inputValue) === -1) {
        setTags([...tags, inputValue]);
      }
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
      <PageSelection currentPage="Pending" />

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
                      onClick={() => showModal(task.data(), task.id)}
                    >
                      <Meta
                        title={task.data().title}
                        description={<DateTimeFormatter date={task.data().deadline}/>}
                      />
                      {task.data().tags && (
                        <>
                          {task.data().tags.map((tag) => {
                            return (
                              <Tag
                                key={tag}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          onCheckBoxTick(task.id)
                        }}
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
      </div>

      <AddTaskButton />
      {content && (

      <Modal
        open={openModal}
        title={content.content.data.title || "No title"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="edit" onClick={handleEditTask}>
            Edit
          </Button>,
          <Button
            key="submit"
            type="danger"
            className="bg-red-500 text-white rounded-xl hover:bg-red-300 border-red-500 border-none hover:text-white"
            loading={loading}
            onClick={() => handleDelete(content.content.id)}
          >
            Delete
          </Button>,
        ]}
      >
        <DateTimeFormatter date={content.content.data.deadline} />
        
        <Editor
          className="show-editor"
          text={content.content.data.description}
          options={{
            disableEditing: true,
            placeholder: false,
          }}
        />
      </Modal>
      )}
    </div>
  );
}