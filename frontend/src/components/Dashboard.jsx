import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import SoldiersTable from './SoldiersTable.jsx';
import Pagination from './common/Pagination.jsx';
import { paginate } from '../utils/paginate.js';

const RANK_HIERARCHY = {
  'Szeregowy': 1,
  'Starszy Szeregowy': 2,
  'Kapral': 3,
  'Starszy Kapral': 4,
  'Plutonowy': 5,
  'Sierżant': 6,
  'Porucznik': 7
};

const Dashboard = () => {
  const [rawSoldiers, setRawSoldiers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: '', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [searchVal, setSearchVal] = useState('');
  const [statusVal, setStatusVal] = useState('Wszystkie');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [searchSubject$] = useState(() => new Subject());

  useEffect(() => {
    fetch('http://localhost:5000/soldiers')
      .then(res => {
        if (!res.ok) throw new Error('Nie udało się pobrać listy personelu.');
        return res.json();
      })
      .then(result => { 
        setRawSoldiers(result);
        setIsLoaded(true); 
      })
      .catch(err => { 
        setError(err); 
        setIsLoaded(true); 
      });
  }, []);

  // --- WYSZUKIWANIE ---
  useEffect(() => {
    const subscription = searchSubject$.pipe(
      map((value) => value.trim().toLowerCase()),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((query) => {
      setDebouncedSearch(query);
      setCurrentPage(1);
    });

    return () => subscription.unsubscribe();
  }, [searchSubject$]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    searchSubject$.next(val);
  };

  const handleStatusChange = (e) => {
    setStatusVal(e.target.value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchVal('');
    setStatusVal('Wszystkie');
    setDebouncedSearch('');
    setSortColumn({ path: '', order: 'asc' });
    setCurrentPage(1);
    searchSubject$.next('');
  };

  const handleSort = (path) => {
    setSortColumn(prev => ({
      path,
      order: prev.path === path && prev.order === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  if (error) return <div className="alert alert-danger">Błąd: {error.message}</div>;
  if (!isLoaded) return <div className="spinner-border text-primary" role="status" />;

  // --- FILTROWANIE ---
  const filteredSoldiers = rawSoldiers.filter(soldier => {
    const matchesStatus = statusVal === 'Wszystkie' || soldier.status === statusVal;
    
    const matchesSearch = !debouncedSearch || 
      `${soldier.firstName} ${soldier.lastName}`.toLowerCase().includes(debouncedSearch) ||
      (soldier.specialization && soldier.specialization.toLowerCase().includes(debouncedSearch)) ||
      (soldier.unit && soldier.unit.toLowerCase().includes(debouncedSearch));

    return matchesStatus && matchesSearch;
  });

  // --- SORTOWANIE ---
  const sortedSoldiers = [...filteredSoldiers].sort((a, b) => {
    if (!sortColumn.path) return 0;

    if (sortColumn.path === 'rank') {
      const valA = RANK_HIERARCHY[a.rank] || 0;
      const valB = RANK_HIERARCHY[b.rank] || 0;
      return sortColumn.order === 'asc' ? valA - valB : valB - valA;
    }
    
    if (sortColumn.path === 'name') {
      const nameA = `${a.lastName} ${a.firstName}`;
      const nameB = `${b.lastName} ${b.firstName}`;
      const cmp = nameA.localeCompare(nameB, 'pl', { numeric: true });
      return sortColumn.order === 'asc' ? cmp : -cmp;
    }

    return 0;
  });

  // --- PAGINACJA ---
  const paginatedSoldiers = paginate(sortedSoldiers, currentPage, pageSize);

  return (
    <section className="app-panel p-4">
      <div className="mb-4">
        <h2 className="mb-1">Panel Dowodzenia (ORBAT)</h2>
        <p className="text-muted">Ewidencja podległego personelu</p>
      </div>

      <div className="card bg-light p-3 mb-4 border shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label fw-semibold text-secondary">Szukaj personelu:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wpisz imię, nazwisko, jednostkę..."
              value={searchVal}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="col-md-4">
            <label className="form-label fw-semibold text-secondary">Filtruj po statusie:</label>
            <select className="form-select" value={statusVal} onChange={handleStatusChange}>
              <option value="Wszystkie">Wszystkie statusy</option>
              <option value="Dostępny">Dostępny</option>
              <option value="Na misji">Na misji</option>
              <option value="Urlop">Urlop</option>
            </select>
          </div>

          <div className="col-md-3">
            <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleReset}>
              ↺ Resetuj filtry i stan bazy
            </button>
          </div>
        </div>
      </div>

      <SoldiersTable 
        soldiers={paginatedSoldiers} 
        onSort={handleSort} 
        sortColumn={sortColumn} 
      />

      <div className="d-flex justify-content-between align-items-center mt-3 bg-white p-3 border rounded shadow-sm">
        <small className="text-muted fw-semibold">
          Wyświetlasz {paginatedSoldiers.length} z {filteredSoldiers.length} żołnierzy (Strona {currentPage})
        </small>
        <Pagination 
          itemsCount={filteredSoldiers.length}
          pageSize={pageSize} 
          currentPage={currentPage} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </section>
  );
};

export default Dashboard;