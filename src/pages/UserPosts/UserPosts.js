import {getPostsByUser} from "../../API";
import {CustomErrorMessage} from "../../components/ErrorMessage/CustomErrorMessage";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {useFetchWithDependencyArray} from "../../hooks/useFetchWithDependencyArray";
import {PostList} from "../../components/PostList/PostList";

export const UserPosts = () => {
    const {user} = useUserTokenContext()
    const {id} = user;
    const postsByUserEndpoint = getPostsByUser(id);

    const {data: posts, error} = useFetchWithDependencyArray(postsByUserEndpoint, [id]);
    if (error) {
        return <CustomErrorMessage error={error}/>;
    }

    return (
        <section>
            <h2>My published posts</h2>
            {id && (
                <>
                    {posts && <PostList posts={posts}/>}
                </>
            )}
        </section>
    );
};
