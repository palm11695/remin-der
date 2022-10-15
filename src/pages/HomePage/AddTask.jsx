import React from "react";
import { Input } from "antd";
import { Button } from "antd";
import './AddTask.css';

export function AddTask() {
  const [task, setTask] = React.useState("");
  const [taskDes, setDes] = React.useState("");

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

  return (
    <div className="add-task">
      <div className="text">Task Name</div>
      <Input
        className="add-task-name"
        placeholder="Add task"
        value={task}
        onChange={handleChange}
      />
      <div className="text">Task Description</div>
      <Input
        className="add-task-des"
        placeholder="Add task description"
        value={taskDes}
        onChange={handleDes}
        />
        <Button className="test-button" type="defualt" onClick={handleClick} >Add Task</Button>
    </div>
  );
}