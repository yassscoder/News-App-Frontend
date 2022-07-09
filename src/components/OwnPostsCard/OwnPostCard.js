import { deletePostService } from "../../services/deletePostService";
import { Button } from "../Button/Button";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { editPostService } from "../../services/editPostService";
import { useNavigate } from "react-router-dom";



export const OwnPostCard = ({ post }) => {
  
  const userContext= useUserTokenContext(); 
  const {token} = userContext;

    const {id, title, topic, opening_line, author, text, photo, total_votes,creation_date } = post;
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
    const navigate = useNavigate();
    const deletePost = async(event)=>{
      try{
       event.preventDefault();
        console.log("delete post card service: ") 
       const response= await deletePostService(token, id);
       
        
      }catch(error){
        console.log(error)
      }
    }
    const EditPost = async(event)=>{
      
     // await editPostService(token, id)
      console.log("edita")
      console.log("redirige form editar")
      navigate(`/myPosts/1/edit`)
    }
    return (
      <section className="entry_info">
        <header>
          <p>{id} del post </p>
          <p>{topic}</p>
          <img
            src={`${process.env.REACT_APP_BASE_URL_IMAGES}/${photo}`}
            alt={title}
          />
          <Button onClick={deletePost}> delete </Button>
          <Button onClick={EditPost}> Edit</Button>
          <h2>{title}</h2>
          <h3>{opening_line}</h3>
          <p>{text}</p>
          <p>{localeDate}</p>
          <h3>{author}</h3>
        </header>
        <span>total votes: {total_votes}</span>
      </section>
    );
  };
  