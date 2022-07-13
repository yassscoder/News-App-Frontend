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
import {EditPost} from "./pages/EditPost/EditPost";
import {Header} from "./components/Header/Header";
import {NotFound} from "./pages/NotFound/NotFound";


function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<LatestPosts />} />
          <Route path="/filterByTopic" element={<PostsByTopic />} />
          <Route path="/filterByDate" element={<PostsByDate />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />

          <Route path="/logout" element={<Logout />} />
          <Route path="/createPost" element={<PostForm />} />
          <Route path="/edit/:id" element={<EditPost/>}/>
          <Route path="/myPosts" element={<UserPosts />} />
          <Route path="/validateEmail" element={<EmailVerification />} />
          <Route path="/myProfile" element={<UserProfile/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;

