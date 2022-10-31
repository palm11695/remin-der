import React from 'react';
import { Divider, Cascader, Button, Card, Tag, Checkbox } from "antd";
import './HomePage.css';


export function HomePage() {
  const colors = [{value:'All',label:'All'}, {value:'TA',label:'TA'}, {value:'High School',label:'High School'}]
  const { Meta } = Card;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };


  return (
    <div className="homepage">
      <div className="text text-2xl" > 
        <text>Remind-เด้อ </text>
        <Button className='log-out-task' onChange={onChange}> <u>Logout</u> </Button>
      </div>

      <Divider orientation="left"></Divider>
      <div className='text-base italic'> Welcome to "<b>Name</b>" Calendar! </div>
      
      <Divider orientation="left">Sort:</Divider>
      <Cascader
      className="home-task-srt"
        style={{ width: '100%' }}
        options={colors}
        multiple
        maxTagCount="responsive"
        defaultValue={['All']}
      />

      <Divider orientation="left">Date</Divider>
      <div className="side-page">
        <Card className='defu-card'>
          <Meta
            title="Card title - 1"
            description="02/02/2000 - 18.00 PM"
          />
          <Tag className='side-tag' color="blue">TA</Tag>
          <Checkbox className='task-fsn' onChange={onChange} ></Checkbox>
          <text className='task-fn-mark' disabled> Mark as done </text>
        </Card>

        <Card className='defu-card'>
          <Meta
            title="Card title - 2" 
            description="Dateline: 18.00 PM"
          />
          <Tag className='side-tag' color="red">High School</Tag>
          <Checkbox className='task-fsn' onChange={onChange}></Checkbox>
          <text className='task-fn-mark' disabled> Mark as done </text> 
        </Card>
        
      </div>

      <Button className="new-task-button" type="defualt" >+ Add new Task</Button>
    </div>
  );
}