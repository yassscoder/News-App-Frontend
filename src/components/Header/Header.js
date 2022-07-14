import {Link} from "react-router-dom";
import {Button} from "../../components/Button/Button";
import "./style.css";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {PicAvatar} from "../PicAvatar/PicAvatar";
import {useNavigate} from "react-router-dom";


export const Header = () => {
    const {user, token, logOut} = useUserTokenContext()
    const navigate = useNavigate()
    return (
        <header className="header">
            <div className="buttons__bar">
                {!token && <Button
                    className="btn__header"
                    onClick={() => {
                        navigate("/register")
                    }}
                >
                    Register

                </Button>}

                {!token && <Button
                    className="btn__header"
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    Login
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
                {<Link to="/">Latest posts</Link>}
                {token && <Link to="/myPosts">My posts</Link>}
                {token && <Link to="/createPost">Create post</Link>}
                <Link to="/filterByDate">Posts by date</Link>
                <Link to="/filterByTopic">Posts by topic</Link>
            </nav>
        </header>
    );
};



