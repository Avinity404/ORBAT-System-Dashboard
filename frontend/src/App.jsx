import { Route, Routes } from 'react-router-dom';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import NotFound from './components/NotFound.jsx';
import SoldierDetail from './components/SoldierDetail.jsx';
import Dashboard from './components/Dashboard.jsx';
import MissionsDashboard from './components/MissionsDashboard.jsx';
import MissionDetail from './components/MissionDetail.jsx';
import OrbatStructure from './components/OrbatStructure.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { AuthProvider } from './components/AuthContext.jsx';

const App = () => (
  <AuthProvider>
    <Navbar />
    <main className="container py-4">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/personnel" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/soldiers/:id" element={<ProtectedRoute><SoldierDetail/></ProtectedRoute>} />
        <Route path="/missions" element={<ProtectedRoute><MissionsDashboard/></ProtectedRoute>} />
        <Route path="/missions/:id" element={<ProtectedRoute><MissionDetail/></ProtectedRoute>} />
        <Route path="/structure" element={<ProtectedRoute><OrbatStructure/></ProtectedRoute>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }/>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </AuthProvider>
);

export default App;