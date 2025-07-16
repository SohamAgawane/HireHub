import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import PostProject from "../pages/PostProject";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Bids from "../pages/Bids";  // Add this import for the Bids page

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/new" element={<PostProject />} />
      <Route path="/projects/edit/:id" element={<PostProject />} />
      <Route path="/post-project" element={<PostProject />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/bids" element={<Bids />} /> 
      <Route path="/my-bids" element={<Bids />} /> 
    </Routes>
  );
}
