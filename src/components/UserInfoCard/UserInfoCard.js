import "./style.css";
import { Link } from "react-router-dom";

export const UserInfoCard = ({ user, token }) => {
  const { avatar, nick_name, email, bio } = user;

  return (
    <>
    {token && <section className="userCard">
      <div>
        <img
          src={`${process.env.REACT_APP_BASE_URL_IMAGES}/upload-avatar-users/${avatar}`}
          alt={nick_name}
        />
        <p className="userCard__user">{nick_name}</p>

        <div className="userCard__info">
          <div>
            <p className="userCard__title">Email:</p>
            <p className="userCard__text  userCard__email">{email}</p>
          </div>

          <div>
            <p className="userCard__title">Bio:</p>
            <p className="userCard__text">
              {bio}
            </p>
          </div>
        </div>

      <Link to="/myPosts" className="userCard__link">My posts</Link>
      </div>

    </section>
}
</>
);
};
