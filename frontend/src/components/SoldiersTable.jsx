import { Link } from 'react-router-dom';

const SoldiersTable = ({ soldiers }) => {
  if (soldiers.length === 0) {
    return <div className="alert alert-warning mb-0">Brak zarejestrowanego personelu.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Stopień</th>
            <th>Imię i Nazwisko</th>
            <th>Jednostka wojskowa</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {soldiers.map((soldier) => {
            const soldierId = soldier.id;

            return (
              <tr key={soldierId}>
                <td>{soldierId}</td>
                <td>
                  <span className="badge bg-dark px-2 py-1.5">{soldier.rank}</span>
                </td>
                <td className="fw-semibold">
                  {soldier.firstName} {soldier.lastName}
                </td>
                <td>{soldier.unit}</td>
                <td>
                  {soldier.isActive ? (
                    <span className="badge bg-success">W służbie</span>
                  ) : (
                    <span className="badge bg-secondary">Rezerwa</span>
                  )}
                </td>
                <td>
                  <Link to={`/soldiers/${soldierId}`} className="btn btn-sm btn-outline-primary">
                    Karta żołnierza
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SoldiersTable;