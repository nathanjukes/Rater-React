import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Navigation/Dashboard";
import Sidebar from "./components/Navigation/Sidebar";
import Login from "./components/Auth/Login";
import User from "./components/Auth/User";
import Application from "./components/DataComponents/Apps/Application";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { axiosPrivate } from "./api/axios";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
