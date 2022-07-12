import "./style.css";
export const PicAvatar =({user})=>{
    const {avatar, nick_name} = user;
    return <img className={"picAvatar"} src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${avatar}`}
                alt={nick_name}/>
}