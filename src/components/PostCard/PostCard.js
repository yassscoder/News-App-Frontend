export const PostCard = ({ post }) => {
  const {title, topic, opening_line, author, text, photo, total_votes,creation_date } = post;
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
      </header>
      <span>total votes: {total_votes}</span>
    </section>
  );
};
