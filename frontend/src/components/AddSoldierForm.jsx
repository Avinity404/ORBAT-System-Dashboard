import React, { useState } from 'react';

const AddSoldierForm = ({onSoldierAdded}) => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    rank: '',
    specialization: '',
    unit: '',
    missionId: '0',
    status: 'Dostępny'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // walidacja
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.rank || !formData.specialization.trim() || !formData.unit.trim()) {
      setError('Wszystkie pola formularza muszą zostać uzupełnione!');
      return;
    }

    // ID
    // const numericIds = existingSoldiers
    //   .map(s => parseInt(s.id, 10))
    //   .filter(id => !isNaN(id));
    // const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    // const newId = String(maxId + 1);

    // const newSoldier = {
    //   ...formData,
    //   id: newId
    // };

    fetch('http://localhost:5000/soldiers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Wystąpił błąd serwera podczas zapisu danych');
        return res.json();
      })
      .then(insertedSoldier => {
        setSuccess(true);
        setFormData(initialFormState);
        
        if (onSoldierAdded)
        {
          onSoldierAdded(insertedSoldier);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div className="card shadow-sm border mb-4">
      <div className="card-header bg-dark text-white py-3">
        <h5 className="mb-0">Rejestracja Nowego Żołnierza do Ewidencji</h5>
      </div>
      <div className="card-body p-4">
        
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Żołnierz został pomyślnie dodany do bazy danych!</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            
            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Imię:</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required/>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Nazwisko:</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required/>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Stopień wojskowy:</label>
              <select
                className="form-select"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                required>
                <option value="">-- Wybierz stopień --</option>
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
              <label className="form-label fw-semibold text-secondary">Status operacyjny:</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required>
                <option value="Dostępny">Dostępny</option>
                <option value="Na misji">Na misji</option>
                <option value="Urlop">Urlop</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Specjalizacja (np. Snajper, Łącznościowiec):</label>
              <input
                type="text"
                className="form-control"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required/>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold text-secondary">Jednostka wojskowa:</label>
              <input
                type="text"
                className="form-control"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required/>
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success w-100 py-2 fw-semibold">
                + Zatwierdź i dodaj do systemu
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSoldierForm;