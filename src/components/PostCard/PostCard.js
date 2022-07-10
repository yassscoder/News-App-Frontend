import {Button} from "../Button/Button";
import {deletePostService} from "../../services/deletePostService";
import {useState} from "react";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {useNavigate} from "react-router-dom";

export const PostCard = ({post}) => {

    const [error, setError] = useState()
    const {token, idUser} = useUserTokenContext()
    const {id, title, topic, opening_line, author, text, photo, total_votes, creation_date} = post;
    const navigate = useNavigate();

    const removePost = async (id) => {
        try {
            const response = await deletePostService(token, id)
            navigate(0);
            /*quiero que al borrarse un post, recargue userPosts*/
            /*lifting state up?? */

        } catch (error) {
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
                {(token) && <Button onClick={(e) => {
                    console.log(e)
                }}>Edit</Button>}

                {(token) && <Button onClick={() => {
                    console.log("delete post");
                    removePost(id)
                }}>Delete</Button>}
            </header>
            <span>total votes: {total_votes}</span>

        </section>
    );
};
