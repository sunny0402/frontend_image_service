import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

import axios from "../api/axios";
const LOGOUT_URL = "/logout";

const Logout = () => {
  const { auth, setAuth } = useAuth();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  // const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGOUT_URL, {
        // headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(JSON.stringify(response));

      //!!!!
      //TODO: add a logout method to useAuth hook which clears data
      //TODO: refresh token not delted in database after logout....
      // TODO: user page looses data after refresh
      setAuth((prev) => {
        return { ...prev, user: "", roles: "", accessToken: "" };
      });

      console.log(
        ">>> DEBUG: Logout.js: auth?.user, auth?.roles, auth?.accessToken: ",
        auth?.user,
        auth?.roles,
        auth?.accessToken
      );

      // Note: After successful logout show success message
      setSuccess(true);
    } catch (err) {
      setErrMsg("Error Logging Out.");
      console.log(`Error logging out: ${err}`);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success! You've logged out.</h1>
          <p>
            <br />
            <a href="login">Sign In</a>
            <br />
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Sign Out</h1>
          <form onSubmit={handleLogout}>
            <button>Sign Out</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Logout;
