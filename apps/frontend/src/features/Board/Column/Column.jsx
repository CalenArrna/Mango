import { Container, Draggable } from "react-smooth-dnd";
import AddButton from "../../../ui/AddButton";

const defaultAdd = {
  id: "task-47",
  title: "take out the garbage",
  priority: "high",
  description: "Grab all the garbage, put it to bag, and throw it out!",
};

function Column({ children, column, dispatch, getTask }) {
  function onAddTask() {
    dispatch({
      type: "add_task",
      payload: { columnId: column.id, newTask: defaultAdd },
    });
  }

  return (
    <Draggable>
      <div className="p-2 w-[500px] h-full space-x-5 border-orange-200 border-2 border-solid">
        <h2>{column.title}</h2>
        <Container
          orientation="vertical"
          groupName="taskLists"
          onDrop={(dropResult) =>
            dispatch({
              type: "move_task",
              payload: { columnId: column.id, dropResult },
            })
          }
          getChildPayload={getTask}
        >
          {children}
          <AddButton onClick={onAddTask} type="flat">
            ➕
          </AddButton>
        </Container>
      </div>
    </Draggable>
  );
}

export default Column;
