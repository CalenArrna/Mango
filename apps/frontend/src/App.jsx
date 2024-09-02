import Board from "./features/Board/Board";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

const router = createBrowserRouter([
  {
    element: <Board />,
    path: "/",
  },
]);

function App() {
  return (
    <AppLayout>
      <RouterProvider router={router}></RouterProvider>
    </AppLayout>
  );
}

export default App;
