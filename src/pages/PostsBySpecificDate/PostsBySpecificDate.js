import { getPostsByDateEndpoint } from "../../API";
import { PostList } from "../../components/PostList/PostList";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { useState } from "react";
import { useFetchWithDependencyArray } from "../../hooks/useFetchWithDependencyArray";

export const PostsByDate = () => {
  const [selectedDate, setDate] = useState(null);
  const postsByDateEndpoint = getPostsByDateEndpoint(selectedDate);
  const { data: posts, error } = useFetchWithDependencyArray(postsByDateEndpoint, [selectedDate]);

  return (
    <section className="posts">
      <h2>Posts of date: {selectedDate}</h2>
      <DatePicker setDate={setDate} />
      {error && <ErrorMessage error={error} />}
      {posts && <PostList posts={posts} />}
    </section>
  );
};
