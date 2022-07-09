import {useUserTokenContext} from "../../contexts/UserTokenContext";

export const Logout = ()=> {
    const{logOut}=useUserTokenContext();
    return (
        <section>
            <button onClick={logOut}>Logout</button>
        </section>
    )
}