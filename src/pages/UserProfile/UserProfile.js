import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {UserInfoCard} from "../../components/UserInfoCard/UserInfoCard";

export const UserProfile = () => {
    const {user, token} = useUserTokenContext()

    return (
        <section>
            <h2>My profile</h2>
            <UserInfoCard user={user} token= {token}/>
        </section>
    )
}
