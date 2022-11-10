import React, {useState, useRef, useEffect} from "react";
import { Divider, Cascader, Button, Card, Tag, Checkbox, Input, Tooltip } from "antd";
import "./HomePage.css";
import { PresetColorTypes } from "antd/lib/_util/colors";
import { PresetStatusColorTypes } from "antd/es/_util/colors";

export function HomePage() {
  const tasks = [
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
  ];
  // const colors = [
  //   { value: "All", label: "All" },
  //   { value: "TA", label: "TA" },
  //   { value: "High School", label: "High School" },
  // ];
  const { Meta } = Card;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
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
        <div className="flex flex-row w-full items-center justify-between">
          <text className="font-bold text-xl">Remind-เด้อ </text>
          <Button
            className="bg-red-700 text-white rounded-xl hover:bg-red-500 border-red-700 border-none hover:text-white"
            type="primart"
            onChange={onChange}
          >
            Logout
          </Button>
        </div>

        <div className="flex flex-row justify-center items-center gap-2">
          <Button>Pending</Button>
          <Button>Finished</Button>
          <Button>Recently Deleted</Button>
        </div>
        <div>
          <Divider orientation="left">Filter</Divider>
          <div className="flex flex-row flex-wrap gap-2 border p-4">
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    className="tag-input"
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
                  className="edit-tag"
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
                className="tag-input"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag className="site-tag-plus" onClick={showInput}>
                New Tag +
              </Tag>
            )}
          </div>
        </div>

        <div>
          <Divider orientation="left">Tasks</Divider>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            {tasks.map((task) => {
              return (
                <Card className="w-[90%] h-fit">
                  <Meta
                    title={task.data.title}
                    description={`${
                      task.data.deadline.getDate() +
                      "/" +
                      task.data.deadline.getMonth() +
                      "/" +
                      task.data.deadline.getFullYear()
                    } - ${
                      task.data.deadline.getHours() +
                      ":" +
                      task.data.deadline.getMinutes()
                    }`}
                  />
                  {task.data.tags.map((tag) => { 
                    return (
                    <Tag
                      className="side-tag"
                      color={PresetStatusColorTypes[Math.round((Math.random() * 100), 0) % 13]}
                    >
                      {tag}
                    </Tag>)
                  })}

                  <Checkbox className="task-fsn" onChange={onChange}></Checkbox>
                  <text className="task-fn-mark" disabled>
                    {" "}
                    Mark as done{" "}
                  </text>
                </Card>
              );
            })}
          </div>
        </div>

        <Button
          className="box-border h-11 w-full inline-block px-6 py-2.5 bg-black text-white rounded-lg"
          type="primary"
        >
          + Add new Task
        </Button>
      </div>
    </div>
  );
}
