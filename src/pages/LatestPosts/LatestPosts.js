import { getLatestPostsEndpoint} from "../../API";
import { PostList } from "../../components/PostList/PostList";
import { CustomErrorMessage } from "../../components/ErrorMessage/CustomErrorMessage";
import {useFetch} from "../../hooks/useFetch";

export const LatestPosts = () => {

  const latestPostsEndpoint = getLatestPostsEndpoint();
  const { data: posts,  error } = useFetch(latestPostsEndpoint);

  return (
    <section className="posts">
      <h2>Latest posts</h2>
      {posts ? <PostList posts={posts} /> : <CustomErrorMessage error={error} />}

    </section>
  );
};

