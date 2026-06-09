import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const SoldierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [soldier, setSoldier] = useState(null);
  const [missionName, setMissionName] = useState('Brak');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const [newMissionId, setNewMissionId] = useState('');
  const [assignMsg, setAssignMsg] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/soldiers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Żołnierz o podanym ID nie figuruje w bazie.');
        return res.json();
      })
      .then(soldierData => {
        setSoldier(soldierData);
        if (soldierData.missionId && soldierData.missionId !== '0') {
          return fetch(`http://localhost:5000/missions/${soldierData.missionId}`)
            .then(res => res.json())
            .then(missionData => {
              setMissionName(missionData.name);
              setIsLoaded(true);
            });
        } else {
          setMissionName('Brak');
          setIsLoaded(true);
        }
      })
      .catch(err => {
        setError(err);
        setIsLoaded(true);
      });
  }, [id]);

  const handleAssign = async () => {
    if (!newMissionId.trim()) return;

    const missionRes = await fetch(`http://localhost:5000/missions/${newMissionId}`);
    if (!missionRes.ok) {
      setAssignMsg({ type: 'danger', text: `Misja o ID "${newMissionId}" nie istnieje.` });
      return;
    }
    const missionData = await missionRes.json();

    await fetch(`http://localhost:5000/soldiers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId: newMissionId, status: 'Na misji' }),
    });

    setSoldier(prev => ({ ...prev, missionId: newMissionId, status: 'Na misji' }));
    setMissionName(missionData.name);
    setAssignMsg({ type: 'success', text: `Przypisano do misji: ${missionData.name}.` });
    setNewMissionId('');
  };

  const handleUnassign = async () => {
    await fetch(`http://localhost:5000/soldiers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ missionId: '0', status: 'Dostępny' }),
    });

    setSoldier(prev => ({ ...prev, missionId: '0', status: 'Dostępny' }));
    setMissionName('Brak');
    setAssignMsg({ type: 'success', text: 'Żołnierz odwołany z misji.' });
  };

  if (error) return <div className="alert alert-danger">Błąd systemu: {error.message}</div>;
  if (!isLoaded) return <div className="spinner-border" role="status" />;

  let statusBadgeColor = 'bg-secondary';
  
  if (soldier.status === 'Dostępny') statusBadgeColor = 'bg-success';
  if (soldier.status === 'Na misji') statusBadgeColor = 'bg-warning text-dark';
  if (soldier.status === 'Urlop') statusBadgeColor = 'bg-danger';

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Profil Żołnierza</h2>
        <span className={`badge p-2 text-uppercase ${statusBadgeColor}`}>
          {soldier.status}
        </span>
      </div>

      <hr/>

      <div className="row mb-4">
        <div className="col-md-6">
          <p className="mb-2"><strong>Stopień:</strong> {soldier.rank}</p>
          <p className="mb-2"><strong>Imię:</strong> {soldier.firstName}</p>
          <p className="mb-2"><strong>Nazwisko:</strong> {soldier.lastName}</p>
          <p className="mb-2"><strong>Specjalizacja:</strong> {soldier.specialization}</p>
        </div>
        <div className="col-md-6">
          <p className="mb-2"><strong>Przydział jednostki:</strong> {soldier.unit}</p>
          <p className="mb-2">
            <strong>Aktualna misja: </strong>
            {soldier.missionId && soldier.missionId !== '0' ? (
              <Link to={`/missions/${soldier.missionId}`} className="fw-semibold text-primary text-decoration-none">
                {missionName}
              </Link>
            ) : (
              <span className="text-muted">{missionName}</span>
            )}
          </p>
          <p className="mb-2 text-muted"><strong>Identyfikator systemowy:</strong> {soldier.id}</p>
        </div>
      </div>

      <button className="btn btn-secondary align-self-start" onClick={() => navigate(-1)}>
        ← Powrót do panelu
      </button>




      {isAdmin && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h6 className="fw-bold mb-1">Panel administratora - przydział do misji</h6>

          {/*misje wpisane na sztywno !*/}
          <small className="text-muted d-block mb-3">
            <b>Dostępne misje:</b> <br/> 1 – PKW Łotwa <br/> 2 – PKW Irak <br/> 3 – PKW Rumunia
          </small>

          {assignMsg && (
            <div className={`alert alert-${assignMsg.type} py-2`}>{assignMsg.text}</div>
          )}

          <div className="d-flex gap-2 align-items-center">
            <input
              type="number"
              className="form-control"
              style={{ maxWidth: 120 }}
              placeholder="ID misji"
              min="1"
              value={newMissionId}
              onChange={e => setNewMissionId(e.target.value)} />
            <button className="btn btn-primary" onClick={handleAssign}>
              Przypisz
            </button>
            <button
              className="btn btn-outline-danger"
              disabled={soldier.missionId === '0'}
              onClick = {handleUnassign} >
              Odwołaj z misji
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoldierDetail;