import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LatestPosts } from "./pages/LatestPosts/LatestPosts";
import { PostsByTopic } from "./pages/PostsByTopic/PostsByTopic";
import { PostsByDate } from "./pages/PostsBySpecificDate/PostsBySpecificDate";
import { PostForm } from "./pages/PostForm/PostForm";
import {LoginForm} from "./pages/LoginForm/LoginForm"
import { RegisterUserForm } from "./pages/RegisterUserForm/RegisterUserForm";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LatestPosts />} />
          <Route path="/filterByTopic" element={<PostsByTopic />} />
          <Route path="/filterByDate" element={<PostsByDate />} />
          <Route path="/CreatePost" element={<PostForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Register" element={<RegisterUserForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

