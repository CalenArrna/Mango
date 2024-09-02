import { Draggable } from "react-smooth-dnd";
import PriorityIcon from "./PriorityIcon";
import _ from "lodash";

const _maxDescriptionCharacterNumber = 100;

function Task({ task }) {
  return (
    <Draggable>
      <div className="p-2 m-3 border-orange-200 border-2 border-solid">
        <div className="flex justify-between mb-1">
          <h1>{task.title}</h1>
          <PriorityIcon priority={task.priority} />
        </div>

        <p>
          {_.truncate(task.description, {
            length: _maxDescriptionCharacterNumber,
          })}
        </p>
      </div>
    </Draggable>
  );
}

export default Task;
