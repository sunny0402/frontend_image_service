import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = ({ userId }) => {
  const [userInfo, setUserInfo] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;

    //Note: for axios, instead of cancelation tokens, AbortController used to cancel request if component unmounts

    const controller = new AbortController();

    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.get(`/users/${userId}`, {
          signal: controller.signal,
        });
        console.log("User component: ", response.data);
        isMounted && setUserInfo(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserInfo();

    //clean up function of useEffect ... runs as component unmounts
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>User Info:</h2>
      {userInfo ? (
        <div>
          <p>{userInfo.email}</p>
          <br />
          <img alt="user" src={userInfo.imageUrl} height="200" />
        </div>
      ) : (
        <p>No user info to display.</p>
      )}
      <br />
    </article>
  );
};

export default Users;
