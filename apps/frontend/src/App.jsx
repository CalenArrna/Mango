import Board from "./features/Board/Board";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Main from "./features/Main/Main";
import { useAuth, AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Main /> },
      { path: "login", element: <div>Login Page</div> }, // TODO Replace with Login Component
      { path: "register", element: <div>Register Page</div> }, // TODO Replace with Register Component
      {
        path: "board",
        element: (
          <PrivateRoute>
            <Board />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  if (!user) {
    const isUserAuthenticated = isAuthenticated();
    return isUserAuthenticated ? children : <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
