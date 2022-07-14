//import { Button } from "../Button/Button";
import { deletePostService } from "../../services/deletePostService";
import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./style.css";

export const PostCard = ({ post }) => {
  const [error, setError] = useState();
  const { token, user } = useUserTokenContext();
  const {
    id,
    title,
    topic,
    opening_line,
    author,
    text,
    photo,
    total_votes,
    creation_date,
    user_id,
  } = post;
  const [votes, setVotes] = useState(total_votes);
  const navigate = useNavigate();

  const removePost = async (id) => {
    try {
      const response = await deletePostService(token, id);
      navigate(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const editPost = (id) => {
    navigate(`/edit/${id}`);
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Madrid",
  };

  const localeDate = new Date(creation_date).toLocaleDateString(
    "en-GB",
    options
  );

  return (
    <section className="postCard">
      <div>
        <p className="postCard__topic">{topic}</p>
        <img
          src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-photos-posts/${photo}`}
          alt={title}
        />
        <p className="postCard__date">{localeDate}</p>
      </div>

      <div className="postCard__container--inner">
        <h3>{title}</h3>
        <h4>{opening_line}</h4>
        <p className="postCard__text">{text}</p>
      </div>

      <div className="postCard__container--flex postCard__container--inner">
        <div>
          <img
            className="postCard__avatar"
            //src={`${process.env.REACT_APP_BASE_URL_IMAGES}/${avatar}`}
            src={`http://localhost:3000/default-user-avatar.jpg`}
            alt={author}
          />
          <p className="postCard__author">{author}</p>
        </div>

        <div>
        
          <p className="postCard__votes--text" numberOfLines={1}>{total_votes}</p>
          <p className="postCard__votes--title">votes</p>
        </div>
      </div>
      
      <div className="postCard__edit--buttons">
        {user_id === user.id && (
          <Tooltip title="Edit Post">
            <Button
              className="postCard__btn"
              shape="default"
              icon={<EditOutlined />}
              onClick={() => {
                editPost(id);
              }}
            >
              Edit
            </Button>
          </Tooltip>
        )}

        {user_id === user.id && (
          <Tooltip title="Delete Post">
            <Button
              className="postCard__btn"
              shape="default"
              icon={<DeleteOutlined />}
              onClick={() => {
                removePost(id);
              }}
            >
              Delete
            </Button>
          </Tooltip>
        )}
      </div>
    </section>
  );
};
