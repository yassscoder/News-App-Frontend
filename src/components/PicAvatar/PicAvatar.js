import "./style.css";
import {Link} from "react-router-dom";
export const PicAvatar =({user})=>{
    const {avatar, nick_name} = user;
    return <Link to={"/myProfile"}><img className={"picAvatar"} src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${avatar}`}
                alt={nick_name}/>
    </Link>
}