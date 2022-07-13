import { getLatestPostsEndpoint} from "../../API";
import { PostList } from "../../components/PostList/PostList";

import {useFetch} from "../../hooks/useFetch";

export const LatestPosts = () => {

  const latestPostsEndpoint = getLatestPostsEndpoint();
  const { data: posts,  error } = useFetch(latestPostsEndpoint);

  return (
    <section className="posts">
      <h2>Latest posts</h2>
      {posts ? <PostList posts={posts} /> : null}

    </section>
  );
};

