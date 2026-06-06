import { Link } from 'react-router-dom';

const SoldiersTable = ({ soldiers, onSort, sortColumn }) => {
  if (soldiers.length === 0) {
    return <div className="alert alert-warning mb-0">Brak zarejestrowanego personelu.</div>;
  }

  const renderSortIcon = (column) => {
    if (sortColumn.path !== column) return null;
    return sortColumn.order === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle mb-0">
        <thead>
          <tr style={{ userSelect:'none'}}>
            {/* Te kolumny są teraz statyczne - nie mają onClick ani ikon */}
            <th>#</th>
            
            {/* Tylko te dwie kolumny są interaktywne i można je sortować */}
            <th style={{ cursor: 'pointer' }} onClick={() => onSort('rank')}>
              Stopień {renderSortIcon('rank')}
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => onSort('name')}>
              Imię i Nazwisko {renderSortIcon('name')}
            </th>
            
            {/* Reszta kolumn ponownie jest zwykłym tekstem */}
            <th>Specjalizacja</th>
            <th>Jednostka</th>
            <th>Status</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {soldiers.map((soldier) => {
            const soldierId = soldier.id;

            let statusBadgeColor = 'bg-secondary';
            if (soldier.status === 'Dostępny') statusBadgeColor = 'bg-success';
            if (soldier.status === 'Na misji') statusBadgeColor = 'bg-warning text-dark';
            if (soldier.status === 'Urlop') statusBadgeColor = 'bg-danger';

            return (
              <tr key={soldierId}>
                <td>{soldierId}</td>
                <td>
                  <span className="badge bg-dark px-2 py-1.5">{soldier.rank}</span>
                </td>
                <td className="fw-semibold">
                  {soldier.firstName} {soldier.lastName}
                </td>
                <td>{soldier.specialization}</td>
                <td>{soldier.unit}</td>
                <td>
                  <span className={`badge ${statusBadgeColor}`}>{soldier.status}</span>
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

