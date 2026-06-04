const Home = () => {
  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h1 className="mb-3">System Ewidencji Wojskowej ORBAT</h1>
      <p className="text-muted fs-5">
        Aplikacja przeznaczona do zarządzania strukturą organizacyjną (Order of Battle), 
        ewidencjonowania personelu wojskowego oraz monitorowania statusu misji.
      </p>
      <hr />
      
      <h3 className="mb-3">Szybkie statystyki</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Zarejestrowany Personel</h5>
            <p className="h2 fw-bold m-0 text-primary">3</p>
            <small className="text-muted">Żołnierzy w bazie danych</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Siły Aktywne</h5>
            <p className="h2 fw-bold m-0 text-success">2</p>
            <small className="text-muted">W czynnej służbie</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-light p-3 border">
            <h5>Aktualne Misje</h5>
            <p className="h2 fw-bold m-0 text-warning">2</p>
            <small className="text-muted">Operacje zagraniczne</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;