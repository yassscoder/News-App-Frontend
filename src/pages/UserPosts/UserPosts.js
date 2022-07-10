import {getPostsByUser} from "../../API";
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {useFetchWithDependencyArray} from "../../hooks/useFetchWithDependencyArray";
import {PostList} from "../../components/PostList/PostList";


export const UserPosts = () => {
    const {idUser} = useUserTokenContext()
    const postsByUserEndpoint = getPostsByUser(idUser);


   /* const deletePost = (id) => { /!*useEffect??*!/
        setPosts(allPosts.filter((post) => post.id !== id));
        console.log(allPosts)
    };*/

    const {data: posts, error} = useFetchWithDependencyArray(postsByUserEndpoint, [idUser]);
    if (error) {
        return <ErrorMessage error={error}/>;
    }

    return (
        <section>
            <h2>My posts</h2>
            {idUser && (
                <>
            {posts && <PostList posts={posts} />}
                </>
            )}
        </section>
    );
};
