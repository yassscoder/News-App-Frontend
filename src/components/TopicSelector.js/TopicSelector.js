import "./style.css";

const topics = [
  { topic: "sports" },
  { topic: "politics" },
  { topic: "finances" },
];

export const TopicSelector = ({ setTopic }) => {
  const handleTopic = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div className="topicSelector">
      <select onChange={handleTopic}>
        <option value="">Choose a topic</option>
        {topics.map((topic, index) => (
          <option key={index}>{topic.topic}</option>
        ))}
      </select>
    </div>
  );
};
