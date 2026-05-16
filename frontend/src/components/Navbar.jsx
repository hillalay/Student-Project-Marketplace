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
        <span>Öğrenci Projeleri</span>
      </Link>

      <nav className="navbar-links">
        <NavLink to="/dashboard">Panel</NavLink>
        <NavLink to="/projects">Projeler</NavLink>
        <NavLink to="/my-projects">Benim Projelerim</NavLink>
        <NavLink to="/my-applications">Başvurularım</NavLink>
        <NavLink to="/applications-received">Gelen Başvurular</NavLink>
      </nav>

      <div className="navbar-actions">
        {!authed ? (
          <>
            <Link to="/login" className="nav-login">
              Giriş Yap
            </Link>
            <Link to="/register" className="nav-register">
              Kayıt Ol
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-logout">
            Çıkış Yap
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
