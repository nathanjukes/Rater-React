import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Navbar} />
          <Route path="/navbar" Component={Navbar} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
