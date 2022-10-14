import React from 'react';
import { Button } from 'antd';
import './HomePage.css';

export function HomePage() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => { 
    setCount(count + 1);
    console.log('Button clicked');
  }

  return (
    // for example
    <div className="HomePage">
      <div className="text">Remindเด้อ</div>
      <div className="mt-2 text">{count}</div>
      {/*
        You can see document of each component in https://ant.design/components/overview/ 
        eg. Button https://ant.design/components/button/
      */}
      <Button className="test-button" type="primary" onClick={handleClick} >ลองกดสิ</Button>
    </div>
  );
}