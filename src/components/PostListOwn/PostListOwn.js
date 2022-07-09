import { List } from "../List/List";
import { OwnPostCard } from "../OwnPostsCard/OwnPostCard";

export const PostListOwn = ({ posts, idUser, id }) => {
  return (
    <List
      className="entries_list"
      data={posts}
      render={(post) => (
        <li key={post.id}>
          <OwnPostCard post={post}/>
        </li>
      )}
    />
  );
};
