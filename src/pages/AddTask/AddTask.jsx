import React from "react";
import { Button, Upload, Cascader, Divider, Input, Tag, UploadOutlined, DatePicker, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import './AddTask.css';
import './CustDes.css';

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

      <Divider orientation="left">Deadline</Divider>
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
        <Button className="str-bold"><strong>B</strong></Button>
        <Button className="str-em"><em>I</em></Button>
        <Button className="str-u"><u>U</u></Button>
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
        <Button className="add-task-upload"> <UploadOutlined /> Click to Upload </Button>
      </Upload>
      </div>
      <Button className="cancel-button" type="defualt" onClick={handleClick} >Cancel</Button>
      <Button className="add-button" type="defualt" onClick={handleClick} >Add</Button>

    </div>
  );
}