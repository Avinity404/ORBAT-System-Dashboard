const RANKS = [
  { rank: 'Szeregowy', nato: 'OR-1', desc: 'Podstawowy stopień szeregowego żołnierza.' },
  { rank: 'Starszy Szeregowy', nato: 'OR-2', desc: 'Żołnierz z doświadczeniem bojowym.' },
  { rank: 'Kapral', nato: 'OR-3', desc: 'Dowódca drużyny lub zastępca.' },
  { rank: 'Starszy Kapral', nato: 'OR-4', desc: 'Starszy podoficer sekcji.' },
  { rank: 'Plutonowy', nato: 'OR-5', desc: 'Podoficer dowodzący plutonem.' },
  { rank: 'Sierżant', nato: 'OR-6', desc: 'Doświadczony podoficer sztabowy.' },
  { rank: 'Porucznik', nato: 'OF-1', desc: 'Najniższy stopień oficerski.' },
];

const UNITS = [
  { name: '1. Warszawska Brygada Pancerna', type: 'Brygada pancerna', loc: 'Warszawa' },
  { name: '6. Brygada Powietrznodesantowa', type: 'Brygada powietrznodesantowa', loc: 'Kraków' },
  { name: '12. Brygada Zmechanizowana', type: 'Brygada zmechanizowana', loc: 'Szczecin' },
  { name: '17. Wielkopolska Brygada Zmechanizowana', type: 'Brygada zmechanizowana', loc: 'Międzyrzecz' },
  { name: '18. Dywizja Zmechanizowana', type: 'Dywizja', loc: 'Siedlce' },
  { name: '25. Brygada Kawalerii Powietrznej', type: 'Brygada lotnicza', loc: 'Tomaszów Mazowiecki' },
];

const MISSIONS = [
  { id: 1, name: 'PKW Łotwa', loc: 'Adazi, Łotwa', frame: 'NATO eFP', desc: 'Wzmocnienie wschodniej flanki Sojuszu.' },
  { id: 2, name: 'PKW Irak', loc: 'Al Asad, Irak', frame: 'Koalicja', desc: 'Misja szkoleniowo-doradcza sił irackich.' },
  { id: 3, name: 'PKW Rumunia',  loc: 'Craiova, Rumunia', frame: 'NATO tFP', desc: 'Budowanie interoperacyjności w rejonie Morza Czarnego.' },
];

const OrbatStructure = () => (
  <div className="card p-4 shadow-sm">
    <h2 className="mb-1">Struktura Sił</h2>
    <p className="text-muted mb-4">Hierarchia dowodzenia i podział struktur wojskowych</p>

    <section className="mb-4">
      <h5 className="mb-2">O systemie</h5>
      <p className="mb-0 text-muted">
        <strong>Order of Battle (ORBAT)</strong> to ewidencja składu, struktury i rozmieszczenia
        sił zbrojnych. System umożliwia śledzenie przydziałów personalnych, monitorowanie statusu
        żołnierzy oraz zarządzanie kontyngentami na misjach zagranicznych. Dane są aktualizowane
        w czasie rzeczywistym przez uprawnionych administratorów.
      </p>
    </section>

    <hr/>

    <section className="mb-4">
      <h5 className="mb-3">Hierarchia stopni wojskowych</h5>
      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Stopień</th>
              <th>Kod NATO</th>
              <th>Charakterystyka</th>
            </tr>
          </thead>
          <tbody>
            {RANKS.map((r, i) => (
              <tr key={r.rank}>
                <td className="text-muted">{i + 1}</td>
                <td><span className="badge bg-dark">{r.rank}</span></td>
                <td><code>{r.nato}</code></td>
                <td className="text-muted small">{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <hr/>

    <section className="mb-4">
      <h5 className="mb-3">Jednostki w ewidencji</h5>
      <div className="row g-3">
        {UNITS.map(u => (
          <div key={u.name} className="col-md-6">
            <div className="card bg-light border p-3 h-100">
              <p className="fw-semibold mb-1">{u.name}</p>
              <small className="text-muted">{u.type} - {u.loc}</small>
            </div>
          </div>
        ))}
      </div>
    </section>

    <hr/>

    <section>
      <h5 className="mb-3">Aktywne kontyngenty zagraniczne</h5>
      <div className="row g-3">
        {MISSIONS.map(m => (
          <div key={m.id} className="col-md-4">
            <div className="card border-primary p-3 h-100">
              <div className="d-flex justify-content-between mb-1">
                <span className="fw-bold text-primary">{m.name}</span>
                <span className="badge bg-primary">{m.frame}</span>
              </div>
              <small className="text-muted d-block mb-2"><b>Lokalizacja:</b> {m.loc}</small>
              <small className="text-muted">{m.desc}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default OrbatStructure;