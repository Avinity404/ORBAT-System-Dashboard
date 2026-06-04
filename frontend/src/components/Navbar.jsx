import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <span className="navbar-brand fw-bold">ORBAT System</span>
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

export default Navbar;