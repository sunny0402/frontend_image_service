import { useState, useEffect } from "react";

function useFetchData(url) {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      // const response = await fetch("/api/getArticles", {
      const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const serverResponse = await response.json();
      setData(serverResponse);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  // return { data };
  return data;
}

export default useFetchData;
