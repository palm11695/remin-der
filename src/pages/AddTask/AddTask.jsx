import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Cascader,
  Divider,
  Input,
  Tag,
  DatePicker,
  TimePicker,
  Tooltip,
  Modal,
} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import {
  checkUserStatus,
} from "../../firebase";
import { Heading } from '../../components'
import './AddTask.css'

// import { tasks } from "./dummy";

export function AddTask() {
  const auth = checkUserStatus();

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

  const navigate = useNavigate();

  const handleCancelModal = () => {
    return confirm({
      title: "Are you sure to discard this task?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        navigate('/');
      },
      onCancel() { 
        console.log('Cancel')
      },
    });
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div className="w-full h-full max-w-sm">
      {!auth && <Navigate to="/login" />}
      <Heading />

      <div className="flex flex-col gap-2 max-w-sm mx-6">
        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Title</Divider>
        <Input
          className="w-full"
          placeholder="Task Title"
          value={task}
          onChange={handleChange}
        />

        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Tag</Divider>
        <div className="flex flex-row flex-wrap gap-2 border p-4 rounded-lg">
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

        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Deadline</Divider>
        <div className="flex flex-row justify-around items-center">
          <DatePicker className="dl-task-date" onChange={onChange} />
          <TimePicker
            className="dl-task-time"
            use12Hours
            format="h:mm A"
            onChange={onChange}
          />
        </div>

        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Reminder</Divider>
        <div className="flex flex-row justify-center items-center">
          <Cascader
            placeholder="Select Time"
            options={opt_remin}
            changeOnSelect
          />
        </div>
        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Description</Divider>
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
          className="add-task-des w-full"
          style={{ minHeight: "200px" }}
          autoSize={{ minRows: 3, maxRows: 3 }}
          placeholder="Add Description"
          value={taskDes}
          onChange={handleDes}
        />
        
        
      </div>
      <div className="fixed bottom-4 w-full max-w-sm px-6">
        <div className="flex flex-row gap-2 justify-center items-center w-full">
          <Button
            className="box-border border-red-500 h-11 sm:max-w-sm w-80 inline-block px-6 py-2.5 bg-red-500 hover:bg-red-300 text-white rounded-lg"
            type="primary"
            onClick={handleCancelModal}
          >
            Cancel
          </Button>
          <Button
            className="box-border border-black h-11 sm:max-w-sm w-80 inline-block px-6 py-2.5 bg-black text-white rounded-lg"
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
