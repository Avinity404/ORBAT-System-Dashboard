import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SoldierDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [soldier, setSoldier] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/soldiers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Żołnierz o podanym ID nie figuruje w bazie.');
        return res.json();
      })
      .then(data => { setSoldier(data); setIsLoaded(true); })
      .catch(err => { setError(err); setIsLoaded(true); });
  }, [id]);

  if (error)
    return <div className="alert alert-danger">Błąd systemu: {error.message}</div>;
  if (!isLoaded)
    return <div className="spinner-border" role="status" />;

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Profil Żołnierza</h2>
        <span className={`badge p-2 ${soldier.isActive ? 'bg-success' : 'bg-secondary'}`}>
          {soldier.isActive ? 'SŁUŻBA CZYNNA' : 'REZERWA'}
        </span>
      </div>
      <hr />
      
      <div className="row mb-4">
        <div className="col-md-6">
          <p className="mb-2"><strong>Stopień:</strong> {soldier.rank}</p>
          <p className="mb-2"><strong>Imię:</strong> {soldier.firstName}</p>
          <p className="mb-2"><strong>Nazwisko:</strong> {soldier.lastName}</p>
        </div>
        <div className="col-md-6">
          <p className="mb-2"><strong>Przydział:</strong> {soldier.unit}</p>
          <p className="mb-2"><strong>Aktualna Misja:</strong> {soldier.mission}</p>
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