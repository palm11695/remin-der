import React from "react";
import { Button, Upload, Cascader, Divider, Input, Tag, DatePicker, TimePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import './AddTask.css';

export function AddTask() {
  const [task, setTask] = React.useState("");
  const [taskDes, setDes] = React.useState("");
  // const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
  const opt_remin = [{value:'',label:'None'}, {value:'30 min',label:'30 min'}, {value:'1 hours',label:'1 hours'}]
  

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleDes = (e) => {
    setDes(e.target.value);
  };

  const handleClick = () => { 
    console.log('Button clicked');
    console.log(task);
    console.log(taskDes);
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <div className="add-task">
      <div className="add-task-info">
      <Divider orientation="left">Title</Divider>
      <Input
        className="add-task-name"
        placeholder="Add task"
        value={task}
        onChange={handleChange}
      />
      
      <Divider orientation="left">Tag</Divider>
      <div className="add-task-tag">
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="green">green</Tag>
      </div>

      <Divider orientation="left">Due Date</Divider>
      <div className="dl-task">
        <DatePicker className="dl-task-date" onChange={onChange} />
        <TimePicker className="dl-task-time" use12Hours format="h:mm A" onChange={onChange} />
      </div>
      
      <Divider orientation="left">Reminder</Divider>
      <Cascader 
        placeholder="Select Time"
        options={opt_remin} 
        changeOnSelect 
      />

      <Divider orientation="left">Description</Divider>
      <span className="str-cont-des">
        <Button className="cus-options"><strong>B</strong></Button>
        <Button className="cus-options"><em>I</em></Button>
        <Button className="cus-options"><u>U</u></Button>
      </span>

      <TextArea
        className="add-task-des"
        // style={{ width: 337 }}
        autoSize={{ minRows: 4, maxRows: 4 }}
        placeholder="Add Description"
        value={taskDes}
        onChange={handleDes}
      />
      <Upload>
        <Button className="add-task-upload"> 
          <span>
            <UploadOutlined style={{verticalAlign: 'middle'}}/> Click to Upload
          </span>
        </Button>
      </Upload>
      </div>
      <Button className="cancel-button" type="defualt" onClick={handleClick} >Cancel</Button>
      <Button className="add-button" type="defualt" onClick={handleClick} >Add</Button>

    </div>
  );
}