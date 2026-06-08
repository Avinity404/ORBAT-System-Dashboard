import { useEffect, useState } from 'react';

const Home = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [missionsCount, setMissionsCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/soldiers').then(res => res.json()),
      fetch('http://localhost:5000/missions').then(res => res.json())
    ])
      .then(([soldiersData, missionsData]) => {
        setSoldiers(soldiersData);
        setMissionsCount(missionsData.length);
        setIsLoaded(true);
      })
      .catch(err => {
        setError(err);
        setIsLoaded(true);
      });
  }, []);

  if (error) return <div className="alert alert-danger">Błąd ładowania statystyk: {error.message}</div>;
  if (!isLoaded) return <div className="spinner-border text-primary" role="status" />;

  const totalSoldiers = soldiers.length;
  
  const activeSoldiers = soldiers.filter(
    soldier => soldier.status === 'Dostępny' || soldier.status === 'Na misji'
  ).length;

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h1 className="mb-3">System Ewidencji Wojskowej ORBAT</h1>
      <p className="text-muted fs-5">
        Aplikacja przeznaczona do zarządzania strukturą organizacyjną (Order of Battle), 
        ewidencjonowania personelu wojskowego oraz monitorowania statusu misji.
      </p>
      
      <hr/>
      
      <h3 className="mb-3">Statystyki czasu rzeczywistego</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Zarejestrowany Personel</h5>
            <p className="h2 fw-bold m-0 text-primary">{totalSoldiers}</p>
            <small className="text-muted">Żołnierzy w bazie danych</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Siły Aktywne</h5>
            <p className="h2 fw-bold m-0 text-success">{activeSoldiers}</p>
            <small className="text-muted">W gotowości i na misjach</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Aktualne Misje</h5>
            <p className="h2 fw-bold m-0 text-warning">{missionsCount}</p>
            <small className="text-muted">Operacje zagraniczne</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;