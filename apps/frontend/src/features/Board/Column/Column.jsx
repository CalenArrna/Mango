import { Container, Draggable } from "react-smooth-dnd";

function Column({ children, column, dispatch, getTask }) {
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
        </Container>
      </div>
    </Draggable>
  );
}

export default Column;
