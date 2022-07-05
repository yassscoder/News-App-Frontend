import { useState, useEffect } from "react";

export const useLocalStorage = (key, defaultValue) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log("token", data)
  }, [data, key]);

  return { data, setData };
};
