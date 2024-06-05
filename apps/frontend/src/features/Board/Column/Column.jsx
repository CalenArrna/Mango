import { Container, Draggable } from "react-smooth-dnd";

function Column({ children, column, dispatch, getTask }) {
  return (
    <Draggable className="p-2 my-3">
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
      </Container>
    </Draggable>
  );
}

export default Column;
