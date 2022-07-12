import {Link} from "react-router-dom";
import {Button} from "../../components/Button/Button";
/* import HeaderAvatar from "../../components/HeaderAvatar/HeaderAvatar"; */
import "./style.css";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {PicAvatar} from "../PicAvatar/PicAvatar";
import {useNavigate} from "react-router-dom";


export const Header = () => {
    const {user, token, logOut} = useUserTokenContext()
    const navigate = useNavigate()
    return (
        <header className="header">
            <div>
                {!token && <Button
                    className="btn__header"
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    Login
                </Button>}
                {!token && <Button
                    className="btn__header"
                    onClick={() => {
                        navigate("/register")
                    }}
                >
                    Register
                </Button>}
                {token && (
                    <PicAvatar user={user}/>
                )}

                {token &&
                    <Button
                        className="btn__header"
                        onClick={() => {
                            logOut()
                        }}
                    >
                        Logout
                    </Button>
                }
            </div>
            <nav>
                {<Link to="/home">Home</Link>}
                {token && <Link to="/createPost">Create post</Link>}
                {token && <Link to="/Register">Register</Link>}
            </nav>
        </header>
    );
};



