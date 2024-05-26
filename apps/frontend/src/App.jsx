import Board from "./features/Board/Board";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <Board />,
    path: "/",
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
