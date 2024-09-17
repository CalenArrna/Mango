import { useReducer } from "react";
import { Container } from "react-smooth-dnd";
import initialData from "../../initialBoardData";
import Column from "./Column/Column.jsx";
import Task from "./Task/Task.jsx";
import AddButton from "../../ui/AddButton.jsx";

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
    case "add_task": {
      return {
        ...state,
        columns: state.columns.map((column) => {
          if (column.id === payload.columnId) {
            return {
              ...column,
              tasks: [...column.tasks, payload.newTask],
            };
          }
          return column;
        }),
      };
    }
    case "edit_task": {
      return state;
    }
    case "delete_task": {
      return state;
    }
    case "add_column": {
      return { ...state, columns: [...state.columns, payload] };
    }
    case "edit_column": {
      return state;
    }
    case "delete_column": {
      return state;
    }

    default:
      return state;
  }
};

const defaultColumn = {
  id: "column-11",
  title: "New Column",
  tasks: [],
};

function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialData);

  function onAddColumn() {
    dispatch({ type: "add_column", payload: defaultColumn });
  }

  return (
    <div className="h-full overflow-scroll">
      <h1 className="text-center mb-4">{state.title}</h1>
      <Container
        className="flex h-full overflow-x-auto"
        orientation="horizontal"
        onDrop={(dropResult) =>
          dispatch({ type: "move_column", payload: dropResult })
        }
      >
        {state.columns.map((column, index) => {
          return (
            <Column
              key={index}
              getTask={(index) =>
                state.columns.find((col) => col.id === column.id).tasks[index]
              }
              column={column}
              dispatch={dispatch}
            >
              {column.tasks.map((task, index) => (
                <Task key={index} task={task} />
              ))}
            </Column>
          );
        })}
        <AddButton onClick={onAddColumn} type="flat">
          ➕
        </AddButton>
      </Container>
    </div>
  );
}

export default Board;
