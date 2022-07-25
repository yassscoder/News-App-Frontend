import { getPostsByDateEndpoint } from "../../API";
import { PostList } from "../../components/PostList/PostList";
import { CustomErrorMessage } from "../../components/ErrorMessage/CustomErrorMessage";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { useState } from "react";
import { useFetchWithDependencyArray } from "../../hooks/useFetchWithDependencyArray";

export const PostsByDate = () => {
  const [selectedDate, setDate] = useState(null);
  const postsByDateEndpoint = getPostsByDateEndpoint(selectedDate);
  const { data: posts, error } = useFetchWithDependencyArray(postsByDateEndpoint, [selectedDate]);

  return (
    <section>
      <h2>Posts by date:</h2>
      <DatePicker setDate={setDate} />
      {error && <CustomErrorMessage error={error} />}
      {posts && <PostList posts={posts} />}
    </section>
  );
};
