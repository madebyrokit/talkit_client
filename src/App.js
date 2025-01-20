import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ListPosts from "./pages/posts/ListPosts";
import Post from "./pages/posts/Post";
import Login from "./pages/sign/Login";
import { AuthProvider } from "./utils/AuthContext";
import Resister from "./pages/sign/Resister";
import Compatibility from './pages/cheme/Input';

import AccountManagement from "./pages/mypages/AccountManagement";
import MyPage from "./pages/mypages/Mypage";

import Result from "./pages/cheme/Result";

import Chat from "./pages/chat/Chat";

import NavBar from "./components/NavBar";
import CreatePost from "./pages/posts/CreatePost";

function App() {
  return (
    <AuthProvider>

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListPosts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/signup" element={<Resister />} />
          <Route path="/account" element={<AccountManagement />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compatibility/result" element={<Result />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/post/create" element={<CreatePost />} />
          
          <Route path="/mypage" element={<MyPage />} />


        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
