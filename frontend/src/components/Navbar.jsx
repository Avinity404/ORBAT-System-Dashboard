import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        
        <div className="d-flex align-items-center gap-2">
          <span className="navbar-brand fw-bold mb-0">ORBAT System</span>
          {isLoggedIn ? (
            <span className="badge bg-success">
              {user?.name ?? user?.login}
            </span>
          ) : (
            <span className="pill badge bg-secondary">
              Niezalogowany
            </span>
          )}
        </div>

        {isLoggedIn && (
          <div className="d-flex align-items-center ms-auto gap-3">
            
            <div className="navbar-nav flex-row gap-3">
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
              
              {user?.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => 'nav-link' + (isActive ? ' active fw-bold' : '')}>
                  Panel Administracji
                </NavLink>
              )}
            </div>

            <button className="btn btn-danger" onClick={handleLogout}>
              Wyloguj
            </button>
        
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;