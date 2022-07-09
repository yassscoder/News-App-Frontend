import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LatestPosts } from "./pages/LatestPosts/LatestPosts";
import { PostsByTopic } from "./pages/PostsByTopic/PostsByTopic";
import { PostsByDate } from "./pages/PostsBySpecificDate/PostsBySpecificDate";
import { UserPosts } from "./pages/UserPosts/UserPosts";
import {Login} from "./pages/Login/Login";
import {PostForm} from "./pages/PostForm/PostForm";
import {Register} from "./pages/Register/Register";
import {EmailVerification} from "./pages/EmailVerification/EmailVerification";
import {Logout} from "./pages/Logout/Logout";
import {UserProfile} from "./pages/UserProfile/UserProfile";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<LatestPosts />} />
          <Route path="/filterByTopic" element={<PostsByTopic />} />
          <Route path="/filterByDate" element={<PostsByDate />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="/createPost" element={<PostForm />} />
          <Route path="/myPosts" element={<UserPosts />} />
          <Route path="/validateEmail" element={<EmailVerification />} />
          <Route path="/myProfile" element={<UserProfile/>}/>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
          {/*  <Route path="/myProfile"/> */}
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

