import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/navbar" Component={Navbar} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
