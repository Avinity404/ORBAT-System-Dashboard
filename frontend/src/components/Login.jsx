import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login: doLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === 'admin' && password === 'admin') {
      doLogin();
      navigate('/admin');
    } else {
      setError('Nieprawidłowy login lub hasło.');
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2 className="mb-4 text-center">Logowanie do systemu</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Login</label>
          <input
            id="login"
            type="text"
            className="form-control"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Hasło</label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Zaloguj się
        </button>
      </form>

      <p className="text-center mt-3 text-muted mb-0" style={{ fontSize: '0.8rem' }}>
        Konto testowe: admin / admin
      </p>
    </div>
  );
};

export default Login;