export const UserInfoCard = ({user}) => {
    const {id, avatar,nick_name, email, bio} = user;
    return (
        <>
            <p>{id}</p>
            <p>{avatar}</p>
            <p>{nick_name}</p>
            <p>{email}</p>
            <p>{bio}</p>
        </>
    )
}
