import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">🌟 TechnoSolutions</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        {/* Routes */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="footer-bar">
          &copy; {new Date().getFullYear()} TechnoSolutions. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
