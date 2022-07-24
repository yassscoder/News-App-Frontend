import { deletePostService } from "../../services/deletePostService";
import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import "./style.css";

import {
  EditOutlined,
  DeleteOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

import {
  removeVotePostService,
  switchVote,
  votePostService,
} from "../../services/voteService";
import { useCheckVote } from "../../hooks/useCheckVote";

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
    avatar: authorAvatar,
  } = post;

  const [votes, setVotes] = useState(total_votes);
  const { currentVote, setCurrentVote } = useCheckVote(id, token);
  const navigate = useNavigate();

  const removePost = async (id) => {
    try {
      await deletePostService(token, id);
      navigate(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const editPost = (id) => {
    navigate(`/edit/${id}`);
  };

  const firstVote = async (id, myVote, token) => {
    try {
      const response = await votePostService(id, myVote, token);
      return response.updatedVotes;
    } catch (error) {
      setError(error.message);
    }
  };
  const updateVote = async (id, token, myVote) => {
    try {
      const response = await switchVote(id, myVote, token);
      return response.updatedVotes;
    } catch (error) {
      setError(error.message);
    }
  };
  const removeVote = async (id, token) => {
    try {
      const response = await removeVotePostService(id, token);
      return response.updatedVotes;
    } catch (error) {
      setError(error.message);
    }
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
            src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${authorAvatar}`}
            alt={author}
          />
          <p className="postCard__author">{author}</p>
        </div>

        <div>
          <p className="postCard__votes--text" numberoflines={1}>
            {votes}
          </p>
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
      <div className="postCard__edit--buttons">
        {token && user_id !== user.id && (
          <Tooltip title="Positive vote">
            <Button
              className="postCard__btn"
              shape="default"
              onClick={async () => {
                const myVote = {
                  is_vote_positive: "true",
                };
                if (currentVote === 0) {
                  const updatedVotes = await updateVote({ id, token, myVote });
                  setCurrentVote(1);
                  setVotes(updatedVotes);
                } else if (currentVote === 1) {
                  const updatedVotes = await removeVote({ id, token });
                  setCurrentVote(null);
                  setVotes(updatedVotes);
                } else if (currentVote === null) {
                  const updatedVotes = await firstVote({ id, myVote, token });
                  setCurrentVote(1);
                  setVotes(updatedVotes);
                }
              }}
            >
              <LikeOutlined className="like-icon" />
            </Button>
          </Tooltip>
        )}
        {token && user_id !== user.id && (
          <Tooltip title="Negative vote">
            <Button
              className="postCard__btn"
              shape="default"
              onClick={async () => {
                const myVote = {
                  is_vote_positive: "false",
                };
                if (currentVote === 1) {
                  const updatedVotes = await updateVote({ id, token, myVote });
                  setVotes(updatedVotes);
                  setCurrentVote(0);
                } else if (currentVote === 0) {
                  const updatedVotes = await removeVote({ id, token });
                  setVotes(updatedVotes);
                  setCurrentVote(null);
                } else if (currentVote === null) {
                  const updatedVotes = await firstVote({ id, myVote, token });
                  setVotes(updatedVotes);
                  setCurrentVote(0);
                }
              }}
            >
              <DislikeOutlined className="like-icon" />
            </Button>
          </Tooltip>
        )}
      </div>
    </section>
  );
};
