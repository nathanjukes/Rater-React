import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import DashboardDataDisplay from "./components/DashboardDataDisplay";
import Login from "./components/Login";
import User from "./components/User";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="" Component={Dashboard} />
          <Route path="/navbar" Component={Navbar} />
          <Route path="/signup" Component={Signup} />
          <Route path="/user" Component={User} />
          <Route path="/login" Component={Login} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/sidebar" Component={Sidebar} />
          <Route path="/dashboarddisplay" Component={DashboardDataDisplay} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
