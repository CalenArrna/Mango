import Header from "./Header";
import Footer from "./Footer";

function AppLayout({ children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;
