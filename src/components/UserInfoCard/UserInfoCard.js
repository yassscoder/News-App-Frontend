export const UserInfoCard = ({user}) => {
    const {id, avatar,nick_name, email, bio} = user;

    return (
        <article>
            <img
                src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${avatar}`}
                alt={nick_name}
            />
            <p>Nick: {nick_name}</p>
            <p>E-mail: {email}</p>
            <p>Bio: {bio}</p>
        </article>
    )
}
