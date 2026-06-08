import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const MissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mission, setMission] = useState(null);
  const [assignedSoldiers, setAssignedSoldiers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/missions/${id}`)
      .then(res => {
        if (!res.ok)
          throw new Error('Misja o podanym ID nie istnieje.');
        return res.json();
      })
      .then(missionData => {
        setMission(missionData);
        
        return fetch(`http://localhost:5000/soldiers`);
      })
      .then(res => res.json())
      .then(allSoldiers => {
        const filtered = allSoldiers.filter(soldier => String(soldier.missionId) === String(id)
        );
        
        setAssignedSoldiers(filtered);
        setIsLoaded(true);
      })
      .catch(err => {
        setError(err);
        setIsLoaded(true);
      });
  }, [id]);

  if (error) return <div className="alert alert-danger">Błąd systemu: {error.message}</div>;
  if (!isLoaded) return <div className="spinner-border" role="status" />;

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-primary">{mission.name}</h2>
        <span className="badge bg-warning text-dark p-2 text-uppercase">Status: Aktywna</span>
      </div>
      <hr />

      <div className="mb-4">
        <h5>Karta Informacyjna Operacji</h5>
        <p className="mb-2"><strong>Teatr działań (Miejsce):</strong> {mission.location}</p>
        <p className="mb-2"><strong>Jednostka wiodąca kontyngentu:</strong> {mission.leaderUnit}</p>
        <p className="mb-2"><strong>Opis operacji:</strong> {mission.description}</p>
      </div>

      <hr />

      <div className="mb-4">
        <h5 className="mb-3">Przypisany Personel Wojskowy ({assignedSoldiers.length})</h5>
        
        {assignedSoldiers.length === 0 ? (
          <div className="alert alert-secondary py-2 mb-0">
            Aktualnie żaden żołnierz nie jest przydzielony do tej operacji.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Stopień</th>
                  <th>Imię i Nazwisko</th>
                  <th>Specjalizacja wojskowa</th>
                  <th>Jednostka macierzysta</th>
                  <th>Akcje</th>
                </tr>
              </thead>
              <tbody>
                {assignedSoldiers.map(soldier => (
                  <tr key={soldier.id}>
                    <td><span className="badge bg-dark">{soldier.rank}</span></td>
                    <td className="fw-semibold">{soldier.firstName} {soldier.lastName}</td>
                    <td>{soldier.specialization}</td>
                    <td>{soldier.unit}</td>
                    <td>
                      <Link to={`/soldiers/${soldier.id}`} className="btn btn-xs btn-link p-0 text-decoration-none">
                        Zobacz profil
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <button className="btn btn-secondary align-self-start" onClick={() => navigate('/missions')}>
        ← Powrót do listy misji
      </button>
    </div>
  );
};

export default MissionDetail;