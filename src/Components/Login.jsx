import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

const TOKEN_KEY = 'authToken';
const TOKEN_EXPIRATION_KEY = 'authTokenExpiration';

function createToken() {
  return Math.random().toString(36).substring(2);
}

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiration = localStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (token && expiration) {
      const now = Date.now();
      if (now < Number(expiration)) {
        onLogin();
        navigate('/');
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRATION_KEY);
      }
    }
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.toLowerCase().trim();

    const users = JSON.parse(localStorage.getItem('userAuths')) || [];
    const userFound = users.find(user => user.correo.toLowerCase() === normalizedEmail);

    if (!userFound) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...😱',
        timer: 2000,
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#ef4444',
        backdrop: `rgba(0, 0, 0, 0.4)`
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (isMatch) {
      Swal.fire({
        title: `¡Inicio de sesión exitoso.🧑‍⚕️!`,
        text: `Bienvenido: ${normalizedEmail}`,
        icon: 'success',
        timer: 2000,
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Continuar',
        backdrop: `rgba(0, 0, 0, 0.4)`
      });

      const token = createToken();
      const expirationTime = Date.now() + 60 * 1000; // 1 minuto

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(TOKEN_EXPIRATION_KEY, expirationTime.toString());

      onLogin();
      navigate('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...😱',
        timer: 2000,
        text: 'Usuario o contraseña incorrectos',
        confirmButtonColor: '#ef4444',
        backdrop: `rgba(0, 0, 0, 0.4)`
      });
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url('/src/assets/fondo/doctorsito.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%'
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Segoe UI', sans-serif",
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '400px',
                height: '400px',
                backgroundColor: 'rgba(10, 211, 77, 0.48)',
                borderRadius: '2rem',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.2rem', fontWeight: 'bold', letterSpacing: '0.5rem' }}>
                  BIENVENIDO
                </h2>

                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <strong>¿Eres nuevo usuario?{' '}</strong>
                  <Link to="/register" style={{ color: '#e5e4ecff', fontWeight: 'bold' }}>
                    Registro
                  </Link>
                </div>

                <form onSubmit={handleSubmit} style={{ width: '90%', textAlign: 'center' }}>
                  <label style={{ fontWeight: '600' }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginBottom: '1rem',
                      border: '1px solid #ccc',
                      borderRadius: '1rem',
                    }}
                  />
                  <label style={{ fontWeight: '600' }}>Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '1rem',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#ffffffff',
                      color: 'black',
                      border: 'none',
                      borderRadius: '1rem',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    Ingresar
                  </button>
                  <div
                    style={{
                      marginTop: '1rem',
                      float: 'right',
                      fontSize: '0.99rem',
                      cursor: 'pointer',
                      color: '#ff0000ff',
                      fontWeight: 'bold',
                      userSelect: 'none',
                    }}
                    onClick={() => setShowForgot(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForgot && (
        <ForgotPassword
          onClose={() => setShowForgot(false)}
        />
      )}
    </>
  );
};

export default Login;
