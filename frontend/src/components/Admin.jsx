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
    <section className="card p-4 shadow-sm">
      <h2 className="mb-2">Panel Administracyjny</h2>
      <p className="text-success fw-semibold">Status: Zalogowano jako Administrator / Kapral</p>
      <hr />

      <div className="alert alert-warning my-3">
        <strong>[DEBUG TEXT] Panel Zarządzania Bazą Danych</strong>
        <p className="mb-0 mt-1">
          Docelowo w tym miejscu Kapral lub Administrator otrzyma dostęp do pełnych operacji CRUD: 
          dodawanie nowych żołnierzy, edycja istniejących profili, usuwanie personelu z ewidencji oraz modyfikowanie celów misji.
        </p>
      </div>

      <button className="btn btn-outline-danger align-self-start mt-2" onClick={handleLogout}>
        Wyloguj z systemu
          </button>
    </section>
  );
};

export default Admin;