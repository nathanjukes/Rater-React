import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import DashboardDataDisplay from "./components/DashboardDataDisplay";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/navbar" Component={Navbar} />
          <Route path="/signup" Component={Signup} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/sidebar" Component={Sidebar} />
          <Route path="/dashboarddisplay" Component={DashboardDataDisplay} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
