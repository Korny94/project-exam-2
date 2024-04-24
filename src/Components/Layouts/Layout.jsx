import Header from "./Header.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
