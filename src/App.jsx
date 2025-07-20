import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AppNoticias from './Cards';
import ResetPassword from './components/ResetPassword';  // <-- Aquí
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const now = new Date().getTime();

    if (token && expiration && now < parseInt(expiration)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    const token = 'tu_token_generado'; // En una app real, lo obtienes del backend
    const expirationTime = new Date().getTime() + 60 * 1000; // 1 minuto de duración

    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationTime);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/noticias/*" element={<AppNoticias />} />
        
        {/* Aquí agregas la ruta para reset password */}
        <Route path="/reset-password" element={<ResetPassword />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
