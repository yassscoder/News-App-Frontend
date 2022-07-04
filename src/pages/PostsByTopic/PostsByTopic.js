import { getPostsByTopic } from "../../API";
import { PostList } from "../../components/PostList/PostList";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useState } from "react";
import { useFetchWithDependencyArray } from "../../hooks/useFetchWithDependencyArray";
import { TopicSelector } from "../../components/topicSelector.js/TopicSelector.js";

export const PostsByTopic = () => {
  const [selectedTopic, setTopic] = useState(null);
  const topicPostsEndpoint = getPostsByTopic(selectedTopic);

  const { data: posts, error } = useFetchWithDependencyArray(topicPostsEndpoint,[selectedTopic]);

  return (
    <section className="posts">
      <h2>Latest posts about topic </h2>
      <TopicSelector setTopic={setTopic} />
      {posts && <PostList posts={posts} />}
      {error && <ErrorMessage error={error} />}
    </section>
  );
};
