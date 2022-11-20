import React from "react";
import { Divider, Card, Tag } from "antd";
import { PresetStatusColorTypes } from "antd/es/_util/colors";
import { Navigate } from 'react-router-dom'
import {
  checkUserStatus,
} from "../../firebase";

import { Heading, PageSelection, AddTaskButton } from '../../components'

export function FinishPage() {
  const auth = checkUserStatus();
  console.log(auth);
  const tasks = [
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 00",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 1",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
    {
      id: "udahfrghs9fhg", //DocRef.id
      data: {
        title: "Task 20",
        content:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        deadline: new Date(),
        reminder: new Date(),
        tags: ["uni", "see"],
        status: "ongoing",
      },
    },
  ];
  const { Meta } = Card;

  return (
    <div className="w-full h-full max-w-sm">
      {!auth && <Navigate to="/login" />}
      <Heading />
      <PageSelection currentPage="Finished" />

      <div className="m-4">
        <Divider orientation="left">Finished Tasks</Divider>
        <div className="w-full max-h-[35rem] overflow-y-scroll">
          <div className="flex flex-col gap-2 items-center justify-center">
            {tasks.map((task) => {
              return (
                <Card className="w-[90%] h-fit" key={task.id}>
                  <Meta
                    title={task.data.title}
                    description={`${
                      task.data.deadline.getDate() +
                      "/" +
                      task.data.deadline.getMonth() +
                      "/" +
                      task.data.deadline.getFullYear()
                    } - ${
                      task.data.deadline.getHours() +
                      ":" +
                      task.data.deadline.getMinutes()
                    }`}
                  />
                  {task.data.tags.map((tag) => {
                    return (
                      <Tag
                        className="mt-2"
                        color={
                          PresetStatusColorTypes[
                            Math.round(Math.random() * 100, 0) % 13
                          ]
                        }
                      >
                        {tag}
                      </Tag>
                    );
                  })}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      <AddTaskButton />
    </div>
  );
}
