import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      // withCredentials allows us to send cookie with request
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log("useRefreshToken: prevState: ", JSON.stringify(prev));
      // view what get back from refresh endpoint after token is verified
      console.log(
        "useRefreshToken: response.data.accessToken: ",
        response.data.accessToken
      );
      return { ...prev, accessToken: response.data.accessToken };
    });
    //will call refresh() when access token expires ...
    //so refresh returns new access token we can use
    return response.data.accessToken;
  };
  //useRefreshToken hook will return refresh function
  return refresh;
};

export default useRefreshToken;
