import { Draggable } from "react-smooth-dnd";

function Task({ task }) {
  return (
    <Draggable>
      <span>{task.content}</span>
    </Draggable>
  );
}

export default Task;
