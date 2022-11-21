import React from 'react';
import { Button } from 'antd';

export function PageSelection(props) {

  const pages = [
    { path: "/", name:"Pending" },
    { path: "/finish", name:"Finished" },
    { path: "/delete", name:"Recently Deleted" }
  ]

  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-4">
      {pages.map((page) => {
        return (
          <a href={page.path}>
            <Button className={ page.name === props.currentPage? "actived-btn": ""}>{page.name}</Button>
          </a>
      )})}
    </div>
  )
}