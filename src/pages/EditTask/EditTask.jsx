import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Input,
  Tag,
  DatePicker,
  Tooltip,
  Modal,
  Space,
} from "antd";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ExclamationCircleOutlined, DownOutlined } from "@ant-design/icons";
import {
  checkUserStatus,
  editTask,
} from "../../firebase";
import { Heading } from '../../components'
import './EditTask.css'
import 'medium-editor/dist/css/themes/default.css'
import 'medium-editor/dist/css/medium-editor.css'
import Editor from 'react-medium-editor';
import moment from 'moment';

export function EditTask() {
  const auth = checkUserStatus();

  const { state } = useLocation();
  const { content } = state.content;
  const initDate = moment(content.data.deadline)

  const [task, setTask] = React.useState(content.data.title);
  const [taskDes, setDes] = React.useState(
    content.data.description === "No description" 
    ? "" : content.data.description
  );
  const [date, setDate] = React.useState(initDate.format('YYYY-MM-DD hh:mm:ss'));
  const [reminder, setReminder] = React.useState({"time": content.data.reminder});

  const items = [
    { key: "None", label: "None" },
    { key: "30 mins", label: "30 mins" },
    { key: "1 hours", label: "1 hours" },
    { key: "2 hours", label: "2 hours" },
  ];
  const handleReminderDateClick = (e) => {
    console.log(e.key);
    setReminder({
      ...reminder,
      "time": e.key
    })
  };
  const menuProps = {
    items,
    onClick: handleReminderDateClick,
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

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleDes = (e) => {
    setDes(e);
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
    setDate(dateString);
    console.log(date, dateString);
  }



  const handleEdit = async () => {
    await editTask({
      docId: content.id,
      content: {
        title: task || "Untitled",
        description: taskDes || "No description",
        deadline:  date === "" ? new Date().toString(): new Date(date).toString(),
        reminder: reminder.time,
        tags: tags,
        status: "ongoing",
    }
    });
    navigate('/');
  };

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
          <DatePicker 
            showTime 
            defaultValue={initDate}
            onChange={onChange} 
            placement="bottomRight" />
        </div>

        <Divider orientation="left" style={{margin: '0.5rem 0'}}>Reminder</Divider>
        <div className="flex flex-row justify-center items-center">
          <Dropdown menu={menuProps} className="w-[100px]" trigger="click">
            <Button>
              <Space className="flex flex-row items-center justify-center">
                {reminder.time}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          {/* <Cascader
            placeholder="Select Time"
            options={opt_remin}
            changeOnSelect
            onChange={(e) => handleReminder(e.target.value)}
          /> */}
        </div>
        <Divider orientation="left" style={{margin: '0.5rem 0 0 0'}}>Description</Divider>
        <p className="text-xs text-center text-gray-500 mb-1">A description can be customized <br/> with '<b>Bold</b>', '<i>Italic</i>', and '<u>Underline</u>'.</p>
        <Editor 
          tag="p"
          text={taskDes} 
          onChange={handleDes}
          options={{ 
            toolbar: { buttons: ['bold', 'italic', 'underline'] },
            placeholder: { text: 'Add description' } 
          }}
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
            onClick={handleEdit}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
