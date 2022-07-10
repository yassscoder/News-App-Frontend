import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {UserInfoCard} from "../../components/UserInfoCard/UserInfoCard";

export const UserProfile = () => {
    const {user} = useUserTokenContext()

    return (
        <section>
            <h2>My profile</h2>
            <p>data user</p>
            <UserInfoCard user={user}/>
        </section>
    )
}
