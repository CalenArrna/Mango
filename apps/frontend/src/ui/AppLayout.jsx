import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex justify-between h-screen flex-col">
      <Header />
      <main className="p-4 flex-1 overflow-x-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
