import {Button} from "../Button/Button";
import {deletePostService} from "../../services/deletePostService";
import {useState} from "react";
import {useUserTokenContext} from "../../contexts/UserTokenContext";

export const PostCard = ({ post }) => {
  const [error, setError]= useState()
  const {token}= useUserTokenContext()
  const {id,title, topic, opening_line, author, text, photo, total_votes,creation_date } = post;
  const deletePost = async (idPost) => {
    try {
      await deletePostService(token, idPost)

    }catch (error){
      setError(error.message)
    }
  }
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Madrid",
  };

  const localeDate = new Date(creation_date).toLocaleDateString("en-GB", options);

  return (
    <section className="entry_info">
      <header>
        <p>{topic}</p>
        <img
          src={`${process.env.REACT_APP_BASE_URL_IMAGES}/${photo}`}
          alt={title}
        />
        <h2>{title}</h2>
        <h3>{opening_line}</h3>
        <p>{text}</p>
        <p>{localeDate}</p>
        <h3>{author}</h3>
        <Button onClick={(e) => {
          console.log(e)}}>Edit</Button>
        <Button onClick={() => {
          console.log("delete post");
        deletePost(id)}}>Delete</Button>
      </header>
      <span>total votes: {total_votes}</span>

    </section>
  );
};
