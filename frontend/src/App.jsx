import { Route, Routes } from 'react-router-dom';
import About from './components/About.jsx';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import NotFound from './components/NotFound.jsx';
import SoldierDetail from './components/SoldierDetail.jsx'; // Czysty, nowy import
import Dashboard from './components/Dashboard.jsx';       // Czysty, nowy import
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

const App = () => (
  <AuthProvider>
    <Navbar />
    <main className="container py-4">
      <Routes>
        {/* Strona główna jako domyślna pierwsza strona */}
        <Route path="/" element={<Home />} />
        
        {/* Panel ORBAT dostępny pod adresem /dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Karta żołnierza dopasowana do linku z tabeli */}
        <Route path="/soldiers/:id" element={<SoldierDetail />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </AuthProvider>
);

export default App;