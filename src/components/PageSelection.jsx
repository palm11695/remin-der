import React from 'react';
import { Button } from 'antd';

export function PageSelection(props) {

  const pages = [
    { key: "Homepage", path: "/", name:"Pending" },
    { key: "Finish", path: "/finish", name:"Finished" },
    { key: "Delete", path: "/delete", name:"Recently Deleted" }
  ]

  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-4">
      {pages.map((page) => {
        return (
          <a href={page.path} key={ page.key }>
            <Button 
              className={ page.name === props.currentPage? "actived-btn": ""}
            >{page.name}</Button>
          </a>
      )})}
    </div>
  )
}