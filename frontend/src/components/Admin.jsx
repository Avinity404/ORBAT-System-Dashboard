import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="app-panel p-4">
      <h2 className="mb-3">Panel admina</h2>
      <p className="text-secondary">Witaj, adminie. Jesteś zalogowany!</p>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Wyloguj
      </button>
    </section>
  );
};

export default Admin;