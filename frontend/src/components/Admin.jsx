import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import AddSoldierForm from './AddSoldierForm.jsx';

const Admin = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [soldiers, setSoldiers] = useState([]);

  // --- stats ---
  const [stats, setStats] = useState(null);

  const handleSoldierAdded = (newSoldier) => {
    setSoldiers(prevSoldiers => {
      const updatedList = [...prevSoldiers, newSoldier];
      
      setStats(prevStats => ({
        ...prevStats,
        total: updatedList.length,
        available: updatedList.filter(s => s.status === 'Dostępny').length,
        onMission: updatedList.filter(s => s.status === 'Na misji').length,
        onLeave:   updatedList.filter(s => s.status === 'Urlop').length,
      }));

      return updatedList;
    });
  };

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/soldiers').then(r => r.json()),
      fetch('http://localhost:5000/missions').then(r => r.json()),
    ]).then(([soldiersData, missions]) => {
      setSoldiers(soldiersData);
      setStats({
        total:     soldiersData.length,
        available: soldiersData.filter(s => s.status === 'Dostępny').length,
        onMission: soldiersData.filter(s => s.status === 'Na misji').length,
        onLeave:   soldiersData.filter(s => s.status === 'Urlop').length,
        missions:  missions.length,
      });
    });
  }, []);

  // --- wyszukiwanie po ID ---
  const [searchId, setSearchId] = useState('');
  const [foundSoldier, setFoundSoldier] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const handleSearch = async () => {
    if (!searchId.trim()) return;
    setSearchError(null);
    setFoundSoldier(null);

    const res = await fetch(`http://localhost:5000/soldiers/${searchId}`);
    if (!res.ok) {
      setSearchError(`Brak żołnierza o ID: ${searchId}`);
      return;
    }
    setFoundSoldier(await res.json());
  };

  const [deleteId, setDeleteId] = useState('');
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  const handleDelete = async () => {
    if (!deleteId.trim()) return;
    setDeleteError(null);
    setDeleteSuccess(null);

    try {
      const res = await fetch(`http://localhost:5000/soldiers/${deleteId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        setDeleteError(`Nie można usunąć. Brak żołnierza o ID: ${deleteId}`);
        return;
      }

      setSoldiers(prevSoldiers => {
        const updatedList = prevSoldiers.filter(s => s.id !== deleteId);
        
        setStats(prevStats => ({
          ...prevStats,
          total: updatedList.length,
          available: updatedList.filter(s => s.status === 'Dostępny').length,
          onMission: updatedList.filter(s => s.status === 'Na misji').length,
          onLeave:   updatedList.filter(s => s.status === 'Urlop').length,
        }));

        return updatedList;
      });

      setFoundSoldier(prev => prev?.id === deleteId ? null : prev);

      setDeleteSuccess(`Pomyślnie usunięto żołnierza o ID: ${deleteId}`);
      setDeleteId('');
    } catch (err) {
      setDeleteError('Wystąpił błąd sieci podczas komunikacji z serwerem.');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="card p-4 shadow-sm">

      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h2 className="mb-1">Panel Administracyjny</h2>
          <p className="text-success fw-semibold mb-0">
            Zalogowano jako: {user?.name ?? user?.login ?? 'Administrator'}
          </p>
        </div>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Wyloguj z systemu
        </button>
      </div>

      <hr/>

      <h5 className="mb-3">Statystyki bazy danych</h5>
      {!stats ? (
        <div className="spinner-border spinner-border-sm text-primary mb-4" role="status" />
      ) : (
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card bg-light p-3 text-center border">
              <p className="h3 fw-bold text-primary mb-1">{stats.total}</p>
              <small className="text-muted">Żołnierzy łącznie</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card bg-light p-3 text-center border">
              <p className="h3 fw-bold text-success mb-1">{stats.available}</p>
              <small className="text-muted">Dostępnych</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card bg-light p-3 text-center border">
              <p className="h3 fw-bold text-warning mb-1">{stats.onMission}</p>
              <small className="text-muted">Na misjach</small>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card bg-light p-3 text-center border">
              <p className="h3 fw-bold text-danger mb-1">{stats.onLeave}</p>
              <small className="text-muted">Na urlopie</small>
            </div>
          </div>
        </div>
      )}

      <hr/>

      <h5 className="mb-3">Wyszukiwanie żołnierza po ID</h5>
      <div className="d-flex gap-2 mb-3" style={{ maxWidth: 340 }}>
        <input
          type="text" 
          className="form-control"
          placeholder="Wpisz ID..."
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Szukaj
        </button>
      </div>

      {searchError && (
        <div className="alert alert-danger py-2">{searchError}</div>
      )}

      {foundSoldier && (
        <div className="card border-primary p-3 mb-4" style={{ maxWidth: 420 }}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1">
                <span className="badge bg-dark me-2">{foundSoldier.rank}</span>
                <strong>{foundSoldier.firstName} {foundSoldier.lastName}</strong>
              </p>
            </div>
            <Link to={`/soldiers/${foundSoldier.id}`} className="btn btn-sm btn-outline-primary">
              Profil →
            </Link>
          </div>
        </div>
      )}

      <hr/>

      <AddSoldierForm onSoldierAdded={handleSoldierAdded} />

      <hr />


      <h5 className="mb-3 text-danger">Usuwanie żołnierza z bazy (po ID)</h5>
      <div className="d-flex gap-2 mb-3" style={{ maxWidth: 340 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Wpisz ID do usunięcia..."
          value={deleteId}
          onChange={e => setDeleteId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleDelete()}/>
          
        <button className="btn btn-danger" onClick={handleDelete}>
          Usuń
        </button>
      </div>

      {deleteError && (
        <div className="alert alert-danger py-2" style={{ maxWidth: 420 }}>{deleteError}</div>
      )}

      {deleteSuccess && (
        <div className="alert alert-success py-2" style={{ maxWidth: 420 }}>{deleteSuccess}</div>
      )}

    </section>
  );
};

export default Admin;