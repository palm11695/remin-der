type Task = {
  id: string;
  data: {
    content: {};
    deadline: Date;
    reminder: Date;
    tag: string[];
    status: string;
  };
};

export const tasks = [
  {
    id: "udahfrghs9fhg", //DocRef.id
    data: {
      content: {},
      deadline: new Date(),
      reminder: new Date(),
      tag: ["uni", "see"],
      status: "ongoing",
    },
  },
];
