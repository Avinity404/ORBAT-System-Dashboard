import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="d-flex align-items-center gap-2 me-4">
          <span className="navbar-brand fw-bold mb-0">ORBAT System</span>
          {isLoggedIn ? (
            <span className="badge bg-success">
              {user?.name ?? user?.login}
            </span>
          ) : (
            <span className="badge bg-secondary">
              Użytkownik
            </span>
          )}
        </div>
        <div className="navbar-nav">
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
            Strona główna
          </NavLink>
          <NavLink to="/personnel" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
            Personel
          </NavLink>
          <NavLink to="/missions" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
            Misje
          </NavLink>
          <NavLink to="/structure" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
            Struktura Sił
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
            Panel Administracji
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;