import { List } from "../List/List";
import { PostCard } from "../PostCard/PostCard";
import "./style.css";

export const PostList = ({ posts }) => {
  return (
    <section>
      <List
        className="postsGrid"
        data={posts}
        render={(post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        )}
      />
    </section>
  );
};
