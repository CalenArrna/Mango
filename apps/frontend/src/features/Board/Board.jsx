import { useReducer } from "react";
import initialData from "../../initialBoardData";
import { Container, Draggable } from "react-smooth-dnd";

const boardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "move_task": {
      const {
        removedIndex,
        addedIndex,
        payload: theMovingTask,
      } = payload.dropResult;
      console.log(action);
      if (
        (removedIndex === null && addedIndex === null) ||
        removedIndex === addedIndex
      ) {
        console.log("Returning original state...");
        return state;
      }

      const updatedColumnsList = [...state.columns];
      updatedColumnsList.forEach((c) => {
        if (c.id === payload.columnId) {
          console.log("Column ID matched");
          let nTasks = [...c.tasks];
          if (removedIndex !== null) {
            console.log("Removing the task to list: ", theMovingTask);
            nTasks = nTasks.filter((task) => task.id !== theMovingTask.id);
          }

          if (
            addedIndex !== null &&
            !nTasks.find((task) => task.id === theMovingTask.id)
          ) {
            console.log("Adding the task to list: ", theMovingTask);
            nTasks.splice(addedIndex, 0, theMovingTask);
          }
          c.tasks = nTasks;
        }
      });

      console.log("AFTER LOOP new colmuns list...", updatedColumnsList);

      return { ...state, columns: updatedColumnsList };
    }
    case "move_column": {
      const newColumnOrder = [...state.columns];
      const { removedIndex, addedIndex } = payload;
      if (removedIndex === addedIndex) return state;
      const movingColumn = newColumnOrder[removedIndex];
      newColumnOrder.splice(removedIndex, 1);
      newColumnOrder.splice(addedIndex, 0, movingColumn);

      return { ...state, columns: newColumnOrder };
    }

    default:
      return state;
  }
};

function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialData);

  return (
    <div>
      <h1>{state.title}</h1>
      <Container
        orientation="horizontal"
        onDrop={(dropResult) =>
          dispatch({ type: "move_column", payload: dropResult })
        }
      >
        {state.columns.map((column) => {
          return (
            <Draggable className="p-2 my-3" key={column.id}>
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
                getChildPayload={(index) =>
                  state.columns.find((col) => col.id === column.id).tasks[index]
                }
              >
                {column.tasks.map((task) => {
                  return (
                    <Draggable key={task.id}>
                      <span>{task.content}</span>
                    </Draggable>
                  );
                })}
              </Container>
            </Draggable>
          );
        })}
      </Container>
    </div>
  );
}

export default Board;
