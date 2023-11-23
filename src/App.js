import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Navigation/Dashboard";
import Sidebar from "./components/DataComponents/Services/Sidebar";
import DashboardDataDisplay from "./components/Navigation/DashboardDataDisplay";
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
