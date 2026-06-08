import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MissionsDashboard = () => {
  const [missions, setMissions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/missions')
      .then((res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać listy misji.');
        return res.json();
      })
      .then((data) => {
        setMissions(data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setError(err);
        setIsLoaded(true);
      });
  }, []);

  if (error)
    return <div className="alert alert-danger">Błąd systemu: {error.message}</div>;
  if (!isLoaded)
    return <div className="spinner-border" role="status"/>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-1">Misje i Operacje Wojskowe</h2>
      <p className="text-muted mb-4">Wykaz aktualnych kontyngentów oraz głównych sił wiodących</p>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kryptonim</th>
              <th>Teatr Działań (Lokacja)</th>
              <th>Jednostka Wiodąca</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.id}>
                <td className="text-muted fw-bold">{mission.id}</td>
                <td className="fw-bold text-primary">{mission.name}</td>
                <td>{mission.location}</td>
                <td>{mission.leaderUnit}</td>
                <td>
                  <Link to={`/missions/${mission.id}`} className="btn btn-sm btn-outline-primary">
                    Szczegóły misji
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissionsDashboard;