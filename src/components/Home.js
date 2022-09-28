import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import User from "./User";

const Home = () => {
  const { auth } = useContext(AuthContext);

  const userId = auth?.userId;
  console.log(">>>DEBUG: userId: ", userId);

  // const logout = async () => {
  //   setAuth({});
  //   navigate("/login");
  // };

  return (
    <section>
      <h1>User Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />

      <User userId={userId} />
      <Link to="/logout">Sign Out</Link>
      {/* <button onClick={logout}>Sign Out</button> */}
    </section>
  );
};

export default Home;
