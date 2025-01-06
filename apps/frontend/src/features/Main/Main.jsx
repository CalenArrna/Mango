import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-orange-50 text-orange-700">
      <h1 className="text-4xl font-bold mb-4">Welcome to 🥭 Mango</h1>
      <p className="text-lg mb-6">
        Organize your boards, tasks, and priorities with ease.
      </p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-600">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="px-4 py-2 bg-white text-orange-700 border border-orange-700 rounded hover:bg-orange-100">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Main;
