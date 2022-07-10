import {useUserTokenContext} from "../../contexts/UserTokenContext";

export const UserProfile = () => {
    const {user} = useUserTokenContext()
    const {id, avatar, email, nick_name, bio} = user;

    return (
        <section>
            <h2>My profile</h2>
            <p>data user</p>
            <p>{id}</p>
            <p>{avatar}</p>
            <p>{email}</p>
            <p>{nick_name}</p>
            <p>{bio}</p>
        </section>
    )
}
