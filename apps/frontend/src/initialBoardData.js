const initialData = {
  id: 1,
  title: "The Board",
  columns: [
    {
      id: "column-1",
      title: "Column 1",
      tasks: [
        { id: "task-1", content: "take out the garbage" },
        { id: "task-2", content: "watch tv show" },
      ],
    },
    {
      id: "column-2",
      title: "Column 2",
      tasks: [
        { id: "task-3", content: "charge phone" },
        { id: "task-4", content: "dog walk" },
      ],
    },
    {
      id: "column-3",
      title: "Column 3",
      tasks: [
        { id: "task-7", content: "do stuff" },
        { id: "task-5", content: "coding" },
        { id: "task-6", content: "debugging" },
      ],
    },
  ],
};

export default initialData;
