const OrbatStructure = () => {
  return (
    <div className="card p-4 shadow-sm">
      <h2 className="mb-1">Struktura Sił (ORBAT)</h2>
      <p className="text-muted mb-4">Hierarchia dowodzenia i podział struktur wojskowych</p>

      <div className="alert alert-info">
        <strong>[DEBUG TEXT] Moduł struktury organizacyjnej</strong>
        <p className="mb-0 mt-1">
          W tej sekcji zostanie zaimplementowane hierarchiczne drzewo jednostek. 
          Żołnierze będą automatycznie grupowani według ich przydziałów (np. 1. Warszawska Brygada Pancerna).
        </p>
      </div>
    </div>
  );
};

export default OrbatStructure;