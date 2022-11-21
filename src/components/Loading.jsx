import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export function Loading() { 
    const antIcon = <LoadingOutlined style={{ fontSize: 96 }} spin />;
    return (
    
  <div className="flex flex-col gap-2 max-w-sm mx-auto items-center justify-center h-[100vh]">
    <Spin indicator={antIcon} />
  </div>
);}
