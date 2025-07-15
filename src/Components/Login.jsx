import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import fondoLogin from '../assets/fondo/fondo.png';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userFound = users.find(user => user.correo === email && user.password === password);

    if (userFound) {
      alert(`Inicio de sesión exitoso. Bienvenido, ${email}`);
      onLogin();
      navigate('/');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${fondoLogin})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      ></div>

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
            color: 'black',
            padding: '1.5rem',
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
          }}
        >
          BIENVENIDOS
        </div>

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
              width: '90%',
              maxWidth: '900px',
              height: '500px',
              backgroundColor: 'rgba(248, 248, 248, 0.85)',
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
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Icon"
                style={{ width: '80px', marginBottom: '1.5rem' }}
              />
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                Iniciar Sesión
              </h2>

              <form onSubmit={handleSubmit} style={{ width: '80%' }}>
                <label style={{ fontWeight: '600' }}>Correo electrónico</label>
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
                    backgroundColor: '#45B36B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '1rem',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  Entrar
                </button>
                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" style={{ color: '#45B36B', fontWeight: 'bold' }}>
                    Registrarse
                  </Link>
                </div>
              </form>
            </div>

            <div
              style={{
                flex: 1,
                backgroundImage:
                  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSYWeuUBT2VZFnnxF8hhGLpj5bHVv-3S11Fw&s")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
