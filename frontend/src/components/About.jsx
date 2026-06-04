import { Link } from 'react-router-dom';

const About = () => (
  <section className="app-panel p-4">
    <h2 className="mb-3">O aplikacji</h2>
    <p>
       <strong>React Laboratoria 09</strong>
    </p>
    <p>
      Aplikacja stworzona w ramach zajęć laboratoryjnych z React. Projekt
      demonstruje podstawy routingu przy użyciu React Router - nawigację między
      widokami, trasy dynamiczne z parametrami oraz obsługę nieistniejących
      ścieżek.
    </p>
    <p>
      Autor: <strong>Michał</strong>
    </p>
    <div className="d-flex gap-2">
      <Link to="/" className="btn btn-primary">
        Strona glowna
      </Link>
      <Link to="/posts" className="btn btn-outline-primary">
        Lista postow
      </Link>
    </div>
  </section>
);

export default About;
