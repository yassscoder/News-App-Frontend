import { getPostsByUser } from "../../API";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { useFetch } from "../../hooks/useFetch";
import {PostListOwn} from "../../components/PostListOwn/PostListOwn"
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {useEffect, useRef, useState} from "react"
import {useFetchWithDependencyArray} from "../../hooks/useFetchWithDependencyArray";

export const UserPosts = () => {
  const {idUser}= useUserTokenContext()

  const [id, setId]= useState(null);

  setId(idUser)
  const postsByUserEndpoint = getPostsByUser(id);
  const { data: posts, error} = useFetchWithDependencyArray(postsByUserEndpoint,[id]);

  //const { idUser } = useParams(); /*id user lo tengo en el context,no? */

  //const {user}  = useUserTokenContext();


  //const {id} = user;
 // console.log(id)

/*  const [postsEndpoint, setPostsEndpoing]= useState("")
  const prevPostsEndpoint = useRef();
  useEffect(() => {

    if(idUser === null){
      console.log("vuelve a renderizar")
    }else {
      prevPostsEndpoint.current= getPostsByUser(idUser)
      setPostsEndpoing(prevPostsEndpoint)

      // const { data: posts, error } = useFetch(postsByUserEndpoint);
      const { data: posts, error } = useFetch(postsEndpoint);

      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (error) {
        return <ErrorMessage error={error} />;
      }
      /!*console.log("idUser" + idUser)
      postsByUserEndpoint = getPostsByUser(idUser);
      console.log(postsByUserEndpoint)
      return postsByUserEndpoint*!/
    }

  },[idUser, postsEndpoint]);*/

  if (error) {
    return <ErrorMessage error={error} />;
  }


  return (
    <section>
      <h2>My posts</h2>
      {/*{posts && <PostListOwn posts={posts}/>}*/}
    </section>
  );
};
