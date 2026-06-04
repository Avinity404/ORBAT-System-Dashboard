import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import NotFound from './components/NotFound.jsx';
import SoldierDetail from './components/SoldierDetail.jsx';
import Dashboard from './components/Dashboard.jsx';
import MissionsDashboard from './components/MissionsDashboard.jsx';
import MissionDetail from './components/MissionDetail.jsx'; // Nowy import
import OrbatStructure from './components/OrbatStructure.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

const App = () => (
  <AuthProvider>
    <Navbar />
    <main className="container py-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personnel" element={<Dashboard />} />
        <Route path="/soldiers/:id" element={<SoldierDetail />} />
        <Route path="/missions" element={<MissionsDashboard />} />
        <Route path="/missions/:id" element={<MissionDetail />} />
        <Route path="/structure" element={<OrbatStructure />} />
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