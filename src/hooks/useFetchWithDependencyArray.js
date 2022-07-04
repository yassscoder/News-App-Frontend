import { useEffect, useState } from "react";
export const useFetchWithDependencyArray = (url, [selectedField]) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (selectedField === null || selectedField === "") {
      console.log("first render");
      setError("");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const body = await response.json();
        if (response.ok) {
          setData(body.data);
        } else {
          throw new Error(body.message);
        }
      } catch (error) {
        setError(error.message);
        setData(null);
      }
    };
    url && fetchData();
    setError(null);
  }, [selectedField]);
  return { data, error };
};
