import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";

function Header({ user }) {
  const isLoggedIn = !!user;
  const { login } = useAuth();

  function handleLogin() {
    login({
      email: "updated@example.com",
      password: "updatedpassword",
    });
  }

  return (
    <header
      className={`p-2 bg-orange-200 flex justify-between align-center ${isLoggedIn ? "h-12" : "h-20"}`}
    >
      <h1
        className={`uppercase text-orange-700 cursor-pointer ${isLoggedIn ? "text-sm" : "text-lg"}`}
      >
        🥭 Mango
      </h1>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <span className="text-orange-700">{user.email}</span>
        ) : (
          <>
            <Button onClick={handleLogin}>Login</Button>
            <Button type="secondary">Register</Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
