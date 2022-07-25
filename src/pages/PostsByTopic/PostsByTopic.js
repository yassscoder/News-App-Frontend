import { getPostsByTopic } from "../../API";
import { PostList } from "../../components/PostList/PostList";
import { CustomErrorMessage } from "../../components/ErrorMessage/CustomErrorMessage";
import { useState } from "react";
import { useFetchWithDependencyArray } from "../../hooks/useFetchWithDependencyArray";
import {TopicSelector} from "../../components/TopicSelector.js/TopicSelector";


export const PostsByTopic = () => {
  const [selectedTopic, setTopic] = useState(null);
  const topicPostsEndpoint = getPostsByTopic(selectedTopic);

  const { data: posts, error } = useFetchWithDependencyArray(topicPostsEndpoint,[selectedTopic]);

  return (
    <section>
      <h2>Posts by topic </h2>
      <TopicSelector setTopic={setTopic} />
      {posts && <PostList posts={posts} />}
      {error && <CustomErrorMessage error={error} />}
    </section>
  );
};
