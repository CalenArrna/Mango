const initialData = {
  id: 1,
  title: "The Board",
  columns: [
    {
      id: "column-1",
      title: "Column 1",
      tasks: [
        {
          id: "task-1",
          title: "take out the garbage",
          priority: "high",
          description: "Grab all the garbage, put it to bag, and throw it out!",
        },
        {
          id: "task-2",
          title: "watch tv show",
          priority: "medium",
          description: "Just watch Netflix and relax.",
        },
      ],
    },
    {
      id: "column-2",
      title: "Column 2",
      tasks: [
        {
          id: "task-3",
          title: "charge phone",
          priority: "low",
          description: "Don't forget to put your phone on the charger!",
        },
        {
          id: "task-4",
          title: "dog walk",
          priority: "high",
          description:
            "Remember, dogs need regular walks! At least twice a day, grab that little monster and take a walk! And don't forget the get the poop when it comes out, shouldn't leave it on the street!",
        },
      ],
    },
    {
      id: "column-3",
      title: "Column 3",
      tasks: [
        {
          id: "task-7",
          title: "do stuff",
          priority: "high",
          description:
            "You know... do stuff... like anything what you want, hobbies and other bullshits.",
        },
        {
          id: "task-5",
          title: "coding",
          priority: "high",
          description: "Do write awesome code each day and more!",
        },
        {
          id: "task-6",
          title: "debugging",
          description:
            "Nasty bugs sleeping in the code, so grab the bug repellant and kill em all!",
        },
      ],
    },
  ],
};

export default initialData;
