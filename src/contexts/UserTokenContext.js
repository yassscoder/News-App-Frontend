import {createContext, useContext, useState, useEffect} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {getDataUserService} from "../services/getDataUserService";

export const UserTokenContext = createContext();

export const UserTokenContextProvider = ({children}) => {
    const {data: token, setData: setToken} = useLocalStorage("token", "");
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const user = await getDataUserService(token);
                console.log(user)
                setUser(user);
            } catch (error) {
                console.error("error en el contexto")
                setToken("");
                setUser({});
            }
        };
        if (token) {
            getUserInfo();
        }
    }, [token, setToken]);
    const logOut = () => {
        setToken("");
        setUser({});
    };
    return (
        <UserTokenContext.Provider value={{user, token, setToken, logOut}}>
            {children}
        </UserTokenContext.Provider>
    );
};

export const useUserTokenContext = () => {
    return useContext(UserTokenContext);
};
