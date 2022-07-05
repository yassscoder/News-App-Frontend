import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getDataUserService } from "../services/getDataUserService";

export const UserTokenContext = createContext();

export const UserTokenContextProvider = ({ children }) => {
  const { data: token, setData: setToken } = useLocalStorage("token", "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getDataUserService(token);
        setUser(user);
      } catch (error) {
        setToken("");
        setUser(null);
      }
    };
    if (token) {
      getUserInfo();
    }
  }, [token, setToken]);

  return (
    <UserTokenContext.Provider value={{ user, token, setToken }}>
      {children}
    </UserTokenContext.Provider>
  );
};

export const useUserTokenContext = () => {
  return useContext(UserTokenContext);
};
