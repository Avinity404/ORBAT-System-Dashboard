import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SoldierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soldier, setSoldier] = useState(null);
  const [missionName, setMissionName] = useState('Brak');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/soldiers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Żołnierz o podanym ID nie figuruje w bazie.');
        return res.json();
      })
      .then(soldierData => {
        setSoldier(soldierData);
        
        // Jeśli żołnierz ma przypisaną misję (missionId różne od "0"), pobieramy jej nazwę
        if (soldierData.missionId && soldierData.missionId !== "0") {
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
          <p className="mb-2"><strong>Aktualna Misja: </strong>
          
          <span className="fw-semibold text-primary">{missionName}</span></p>

          <p className="mb-2 text-muted"><strong>Identyfikator systemowy:</strong> {soldier.id}</p>
        </div>
      </div>

      <button className="btn btn-secondary align-self-start" onClick={() => navigate(-1)}>
        ← Powrót do panelu
      </button>
    </div>
  );
};

export default SoldierDetail;