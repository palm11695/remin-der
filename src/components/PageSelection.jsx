import React from 'react';
import { Button } from 'antd';

export function PageSelection() {
  return (
    <div className="flex flex-row justify-center items-center gap-2 mt-4">
      <a href="/">
      <Button>Pending</Button>
      </a>
      <a href="/finish">
      <Button>Finished</Button>
      </a>
      <a href="/delete">
      <Button>Recently Deleted</Button>
      </a>
    </div>
  )
}