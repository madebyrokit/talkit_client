//App.js
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

import Mychemilist from "./pages/mypages/Mychemilist";
import Mydiscussion from "./pages/mypages/Mydiscussion";
import Myinfor from "./pages/mypages/Myinfor";
import Qa from "./pages/mypages/Qa";
import DeleteAccount from "./pages/mypages/DeleteAccount";

import NavBar from "./components/NavBar";
import CreatePost from "./pages/posts/CreatePost";

function App () {
  return (
    <AuthProvider>
      
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<ListPosts />} />
          <Route path="/post/:id" element={<Post/>} />
          <Route path="/signup" element={<Resister/>} />
          <Route path="/compatibility" element={<Compatibility />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/Mychemilist" element={<Mychemilist />} />
          <Route path="/Mydiscussion" element={<Mydiscussion />} />
          <Route path="/profile" element={<Myinfor />} />
          <Route path="/Q&A" element={<Qa />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
