import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <span className="navbar-brand">ORBAT System</span>
      <div className="navbar-nav">

        <NavLink
          to="/"
          className={({ isActive }) =>
            'nav-link' + (isActive ? ' active fw-bold' : '')
          }
        >
          Strona główna
        </NavLink>

        {/* Zmieniono z /posts na /dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            'nav-link' + (isActive ? ' active fw-bold' : '')
          }
        >
          Dashboard ORBAT
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            'nav-link' + (isActive ? ' active fw-bold' : '')
          }
        >
          O aplikacji
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            'nav-link' + (isActive ? ' active fw-bold' : '')
          }
        >
          Panel administracji
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;