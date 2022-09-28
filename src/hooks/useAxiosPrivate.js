//Hook will attach interceptors to this axios instance
import axios, { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //Note: interceptors are like event listeners. but need to attach and remove.

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //Note: if authorization header does not exist, it is not a retry
        if (!config.headers["Authorization"]) {
          //Note: get accessToken from auth state ... got access token on initial auth or after refresh
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        //Note: if auth header set ... we know it has been set after a 403 error ... as below
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      //Note: if token expired will be inside async error handler
      async (error) => {
        const prevRequest = error?.config;
        //Note: if error due to expired access token expect 403
        //Note: sent property indicaes first retry. avoiding infinite loop of 403. only try once.
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          //TODO: error with /refresh
          const newAccessToken = await refresh();
          //update request with new access token
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          //call axiosPrivate again with new token
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    //use clean up function to remove interceptors
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  //this hook will return an axiosPrivate instance
  return axiosPrivate;
};

export default useAxiosPrivate;
