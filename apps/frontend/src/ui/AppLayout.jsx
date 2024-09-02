import Header from "./Header";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div className="flex justify-between h-screen flex-col">
      <Header />
      <div className="p-4 flex-1 overflow-x-auto">{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;
