import { Link, NavLink,useNavigate } from "react-router-dom";
import "./Navbar.css";
import { isAuthenticated, logout } from "../services/authService";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const authed = isAuthenticated();

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
        {!authed ? (
          <>
            <Link to="/login" className="nav-login">
              Login
            </Link>
            <Link to="/register" className="nav-register">
              Register
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
