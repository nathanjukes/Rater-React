import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import DashboardDataDisplay from "./components/DashboardDataDisplay";
import Login from "./components/Login";
import User from "./components/User";
import Application from "./components/Application";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { axiosPrivate } from "./api/axios";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/dashboarddisplay" element={<DashboardDataDisplay />} />
          {/* New route to handle app names */}
          <Route path="/apps/:appName" element={<Application />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
