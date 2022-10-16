import React from 'react';
import './HomePage.css';

import { Divider } from "antd";
import { Cascader } from "antd";
import { Button } from "antd";
import { Card } from "antd";
import { Tag } from "antd";
import { Checkbox } from 'antd';
import TextArea from "antd/lib/input/TextArea";


export function HomePage() {
  const colors = [{value:'All',label:'All'}, {value:'TA',label:'TA'}, {value:'High School',label:'High School'}]
  const { Meta } = Card;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };


  return (
    <div className="homepage">
      <div className="text"> Remind-เด้อ </div>

      <Divider orientation="left">Feature Future</Divider>
      <TextArea
        className="home-task-des"
        autoSize={{ minRows: 2, maxRows: 2 }}
        placeholder="Feature Future"
      />
      
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
          <Checkbox className='task-fsn' onChange={onChange}></Checkbox> 
        </Card>

        <Card className='defu-card'>
          <Meta
            title="Card title - 2" 
            description="Dateline: 18.00 PM"
          />
          <Tag className='side-tag' color="red">High School</Tag>
          <Checkbox className='task-fsn' onChange={onChange}></Checkbox> 
        </Card>
        
      </div>

      <Button className="new-task-button" type="defualt" >+ Add new Task</Button>
    </div>
  );
}