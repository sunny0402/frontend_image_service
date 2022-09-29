import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      // Note: withCredentials allows us to send cookie with request
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(">>>DEBUG useRefreshToken: prev: ", JSON.stringify(prev));
      // Note: view what get back from refresh endpoint after token is verified
      console.log(
        ">>>DEBUG useRefreshToken: response.data.accessToken: ",
        response.data.accessToken
      );
      return { ...prev, accessToken: response.data.accessToken };
    });
    //Note: we will call the refresh() hook when access token expires ...
    //Note: so refresh returns new access token we can use
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
