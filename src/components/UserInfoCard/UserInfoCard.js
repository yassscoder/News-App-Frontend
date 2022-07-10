export const UserInfoCard = ({user}) => {
    const {id, avatar,nick_name, email, bio} = user;
    console.log(avatar)
    return (
        <>
            <p>{id}</p>
            <img
                src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${avatar}`}
                alt={nick_name}
            />
            <p>{nick_name}</p>
            <p>{email}</p>
            <p>{bio}</p>
        </>
    )
}
