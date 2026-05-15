import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/dashboard" className="navbar-logo">
        <span className="logo-mark">SP</span>
        <span>Student Projects</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/my-projects">My Projects</NavLink>
        <NavLink to="/my-applications">Applications</NavLink>
      </nav>

      <div className="navbar-actions">
        <Link to="/login" className="nav-login">
          Login
        </Link>
        <Link to="/register" className="nav-register">
          Register
        </Link>
      </div>
    </header>
  );
}

export default Navbar;