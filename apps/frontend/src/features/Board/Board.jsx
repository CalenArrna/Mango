import { useReducer } from "react";
import { Container } from "react-smooth-dnd";
import initialData from "../../initialBoardData";
import Column from "./Column/Column.jsx";
import Task from "./Task/Task.jsx";

const boardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "move_task": {
      const {
        removedIndex,
        addedIndex,
        payload: theMovingTask,
      } = payload.dropResult;

      if (
        (removedIndex === null && addedIndex === null) ||
        removedIndex === addedIndex
      ) {
        return state;
      }

      const updatedColumnsList = [...state.columns];
      updatedColumnsList.forEach((c) => {
        if (c.id === payload.columnId) {
          let nTasks = [...c.tasks];
          if (removedIndex !== null) {
            nTasks = nTasks.filter((task) => task.id !== theMovingTask.id);
          }

          if (
            addedIndex !== null &&
            !nTasks.find((task) => task.id === theMovingTask.id)
          ) {
            nTasks.splice(addedIndex, 0, theMovingTask);
          }
          c.tasks = nTasks;
        }
      });

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
        {state.columns.map((column, index) => {
          return (
            <Column
              key={column.id}
              getTask={(index) =>
                state.columns.find((col) => col.id === column.id).tasks[index]
              }
              column={column}
              dispatch={dispatch}
            >
              {column.tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </Column>
          );
        })}
      </Container>
    </div>
  );
}

export default Board;
