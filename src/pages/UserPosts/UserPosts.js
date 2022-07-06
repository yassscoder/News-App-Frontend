import { useParams } from "react-router-dom";
import { getPostsByUser } from "../../API";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useFetch } from "../../hooks/useFetch";
import { PostList } from "../../components/PostList/PostList";
export const UserPosts = () => {
  const { id } = useParams();
  const postsByUserEndpoint = getPostsByUser(id);
  const { data: posts, error } = useFetch(postsByUserEndpoint);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  return (
    <section>
      <h2>My posts</h2>
      {posts && <PostList posts={posts} />}
    </section>
  );
};
