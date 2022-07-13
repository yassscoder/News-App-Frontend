import {Button} from "../Button/Button";
import {deletePostService} from "../../services/deletePostService";
import {useState} from "react";
import {useUserTokenContext} from "../../contexts/UserTokenContext";
import {useNavigate} from "react-router-dom";

export const PostCard = ({post}) => {

    const [error, setError] = useState()
    const {token, user} = useUserTokenContext()
    const {id, title, topic, opening_line, author, text, photo, total_votes, creation_date, user_id} = post;
    const [votes, setVotes] = useState(total_votes);
    const navigate = useNavigate();

    const removePost = async (id) => {
        try {
            const response = await deletePostService(token, id)
            navigate(0);


        } catch (error) {
            setError(error.message)
        }
    }

    const editPost = (id) => {
        navigate(`/edit/${id}`)
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
                    src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-photos-posts/${photo}`}
                    alt={title}
                />
                <h2>{title}</h2>
                <h3>{opening_line}</h3>
                <p>{text}</p>
                <p>{localeDate}</p>
                <h3>{author}</h3>
                {(user_id === user.id) && <Button onClick={() => {
                    editPost(id)
                }}>Edit</Button>}

                {(user_id === user.id) && <Button onClick={() => {
                    removePost(id)
                }}>Delete</Button>}
            </header>
            <span>total votes: {votes}</span>

        </section>
    );
};
