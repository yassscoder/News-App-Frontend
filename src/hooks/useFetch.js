import { useEffect, useState } from "react";

export const useFetch = (urlPath) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlPath);
        const body = await response.json();
        if (response.ok) {
          setData(body.data);
        } else {
          throw new Error(body.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return { data, error };
};
