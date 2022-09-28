import React from "react";

import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

//Note: auth and protected route components
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Logout from "./components/Logout";

//Note: for authorized users and for admins if were to extend app functionality
const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <div className="app">
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="logout" element={<Logout />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="user" element={<Home />} />
        </Route>
        <Route path="*" element={<Missing />} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
