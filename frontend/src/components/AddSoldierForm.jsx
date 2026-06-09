import { useState } from 'react';

const AddSoldierForm = ({ onSoldierAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rank, setRank] = useState('Szeregowy');
  const [status, setStatus] = useState('Dostępny');
  const [unit, setUnit] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // walidacja
    
    if (!firstName.trim() || !lastName.trim() || !unit.trim() || !specialization.trim()) {
      setError('Błąd operacji: Wszystkie pola formularza są wymagane.');
      return;
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      rank,
      status,
      unit: unit.trim(),
      specialization: specialization.trim()
    };

    try {
      const res = await fetch('http://localhost:5000/soldiers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      });

      if (!res.ok)
        throw new Error('Serwer odrzucił żądanie zapisu.');

      const createdSoldier = await res.json();
      
      onSoldierAdded(createdSoldier);

      setFirstName('');
      setLastName('');
      setRank('Szeregowy');
      setStatus('Dostępny');
      setUnit('');
      setSpecialization('');
      setSuccess(true);
    } catch (err) {
      setError('Błąd połączenia z bazą danych API.');
    }
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">Rejestracja Nowego Personelu</h5>

      {error && <div className="alert alert-danger py-2 small fw-mono">{error} </div>}

      {success && <div className="alert alert-success py-2 small fw-mono">Potwierdzenie: Rekord został pomyślnie dodany do bazy danych.</div>}

      <form onSubmit={handleSubmit} className="p-3 bg-light border rounded">
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Imię:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wprowadź imię"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Nazwisko:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wprowadź nazwisko"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Stopień wojskowy:</label>
            <select 
              className="form-select"
              value={rank}
              onChange={(e) => setRank(e.target.value)}>
              <option value="Szeregowy">Szeregowy</option>
              <option value="Starszy Szeregowy">Starszy Szeregowy</option>
              <option value="Kapral">Kapral</option>
              <option value="Starszy Kapral">Starszy Kapral</option>
              <option value="Plutonowy">Plutonowy</option>
              <option value="Sierżant">Sierżant</option>
              <option value="Porucznik">Porucznik</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Status dyspozycyjności:</label>
            <select 
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option value="Dostępny">Dostępny</option>
              <option value="Urlop">Urlop</option>
            </select>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Przypisana jednostka:</label>
            <input
              type="text"
              className="form-control"
              placeholder="np. 12. Brygada Zmechanizowana"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small fw-bold text-muted mb-1">Specjalizacja wojskowa:</label>
            <input
              type="text"
              className="form-control"
              placeholder="np. Saper, Łącznościowiec"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-success">
            + Dodaj wpis do ewidencji
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSoldierForm;