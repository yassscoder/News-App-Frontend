import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LatestPosts } from './pages/LatestPosts/LatestPosts';
import { PostsByTopic } from './pages/PostsByTopic/PostsByTopic';
import { PostsByDate } from './pages/PostsBySpecificDate/PostsBySpecificDate';

function App() {
  
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<LatestPosts />} />
      <Route path="/filterByTopic" element={<PostsByTopic />} />
      <Route path="/filterByDate" element={<PostsByDate />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
