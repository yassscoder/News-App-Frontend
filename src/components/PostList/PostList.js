import { List } from "../List/List";
import { PostCard } from "../PostCard/PostCard";

export const PostList = ({ posts }) => {
  return (
    <List
      className="entries_list"
      data={posts}
      render={(post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      )}
    />
  );
};
