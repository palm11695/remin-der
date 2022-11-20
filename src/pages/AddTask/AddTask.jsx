import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Upload,
  Cascader,
  Divider,
  Input,
  Tag,
  DatePicker,
  TimePicker,
  Tooltip,
  Modal,
  Space,
} from "antd";
import { Navigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {
  signInWithGoogle,
  signOutWithGoogle,
  checkUserStatus,
} from "../../firebase";

import Heading from '../../components/Heading'

// import { tasks } from "./dummy";

export function AddTask() {
  const auth = checkUserStatus();
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

  const [task, setTask] = React.useState("");
  const [taskDes, setDes] = React.useState("");
  // const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  const opt_remin = [
    { value: "", label: "None" },
    { value: "30 min", label: "30 min" },
    { value: "1 hours", label: "1 hours" },
  ];

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

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleDes = (e) => {
    setDes(e.target.value);
  };

  const handleClick = () => {
    console.log("Button clicked");
    console.log(task);
    console.log(taskDes);
  };

  const { confirm } = Modal;

  const handleCancelModal = () => {
    return confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "You can restore it later",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div className="w-full p-8">
      {!auth && <Navigate to="/login" />}
      <div className="flex flex-col gap-2 max-w-sm mx-auto">
        <Heading />
        <Divider orientation="left">Title</Divider>
        <Input
          className="w-full"
          placeholder="Add task"
          value={task}
          onChange={handleChange}
        />

        <Divider orientation="left">Tag</Divider>
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

        <Divider orientation="left">Deadline</Divider>
        <div className="flex flex-row justify-around items-center">
          <DatePicker className="dl-task-date" onChange={onChange} />
          <TimePicker
            className="dl-task-time"
            use12Hours
            format="h:mm A"
            onChange={onChange}
          />
        </div>

        <Divider orientation="left">Reminder</Divider>
        <div className="flex flex-row justify-center items-center">
          <Cascader
            placeholder="Select Time"
            options={opt_remin}
            changeOnSelect
          />
        </div>
        <Divider orientation="left">Description</Divider>
        <span className="flex flex-row items-center justify-center gap-1 mt-0">
          <Button className="str-bold">
            <strong>B</strong>
          </Button>
          <Button className="str-em">
            <em>I</em>
          </Button>
          <Button className="str-u">
            <u>U</u>
          </Button>
        </span>

        <TextArea
          className="add-task-des"
          // style={{ width: 337 }}
          autoSize={{ minRows: 3, maxRows: 3 }}
          placeholder="Add Description"
          value={taskDes}
          onChange={handleDes}
        />
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <Upload className="flex flex-row items-center justify-center">
            <Button className="add-task-upload"> Click to Upload </Button>
          </Upload>
          <Button
            className="bg-red-700 hover:bg-red-500 text-white h-[50px] rounded-lg border-none w-full"
            type="primary"
            onClick={handleCancelModal}
          >
            Cancel
          </Button>
          <Button
            className="bg-black hover:bg-gray-800 h-[50px] rounded-lg border-none w-full"
            type="primary"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
