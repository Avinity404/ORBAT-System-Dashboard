import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center mt-5">
    <h1 className="display-1 text-danger">404</h1>
    <h2>Nie znaleziono strony</h2>
    <p className="text-muted">
      Strona, której szukasz, nie istnieje lub została przeniesiona.
    </p>
    <Link to="/" className="btn btn-primary">
      Wróć na stronę główną
    </Link>
  </div>
);

export default NotFound;