import { useEffect, useState } from 'react';
import SoldiersTable from './SoldiersTable.jsx';

const API_URL = 'http://localhost:5000/soldiers';

const Dashboard = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Nie udało się pobrać listy personelu.');
        }
        return response.json();
      })
      .then((data) => {
        setSoldiers(data);
        setIsLoaded(true);
      })
      .catch((fetchError) => {
        setError(fetchError);
        setIsLoaded(true);
      });
  }, []);

  return (
    <section className="app-panel p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Panel Dowodzenia (ORBAT)</h2>
          <p className="text-muted">Ewidencja i struktura podległego personelu</p>
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger">Błąd: {error.message}</div>
      ) : null}

      {!isLoaded ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status" aria-label="Ładowanie..." />
        </div>
      ) : null}

      {isLoaded && !error ? <SoldiersTable soldiers={soldiers} /> : null}
    </section>
  );
};

export default Dashboard;