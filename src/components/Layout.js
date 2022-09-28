import { Outlet } from "react-router-dom";

// Outlet component respresents all the children of the Layout component
// Can have more than 1 outlet
const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
