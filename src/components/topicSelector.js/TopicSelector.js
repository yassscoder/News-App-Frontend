const topics = [
  { topic: "sports" },
  { topic: "politics" },
  { topic: "finances" },
];

export const TopicSelector = ({ setTopic }) => {
  const handleTopic = (event) => {
    setTopic(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <select onChange={handleTopic}>
        <option value="">Choose topic</option>
        {topics.map((topic, index) => (
          <option key={index}>{topic.topic}</option>
        ))}
      </select>
    </>
  );
};
