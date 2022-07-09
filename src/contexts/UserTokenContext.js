import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getDataUserService } from "../services/getDataUserService";

export const UserTokenContext = createContext();

export const UserTokenContextProvider = ({ children }) => {
  const { data: token, setData: setToken } = useLocalStorage("token", "");
  const [user, setUser] = useState(null);
  const [idUser, setIdUser] = useState(null)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getDataUserService(token);
        console.log(user)
        setUser(user);
        const {id}= user;
        console.log(id)
        setIdUser(id)
      } catch (error) {
        console.error("error en el contexto")
        setToken("");
        setUser(null);
        setIdUser(null)
      }
    };
    if (token) {
      getUserInfo();
    }
  }, [token, setToken, idUser, setIdUser]);
  const logout = () => {
    setToken("");
    setUser(null);
    setIdUser(null)
  };
  return (
    <UserTokenContext.Provider value={{ idUser, user,token, setToken, logout }}>
      {children}
    </UserTokenContext.Provider>
  );
};

export const useUserTokenContext = () => {
  return useContext(UserTokenContext);
};
