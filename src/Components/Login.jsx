import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '1rem',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h3 
          style={{ 
            textAlign: 'center', 
            color: '#27ae60', 
            marginBottom: '2rem', 
            fontWeight: '700',
            fontSize: '1.8rem',
            letterSpacing: '1px'
          }}
        >
          Iniciar Sesión
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              style={{ 
                display: 'block', 
                marginBottom: '.5rem', 
                fontWeight: '600', 
                color: '#333' 
              }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="usuario@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label 
              style={{ 
                display: 'block', 
                marginBottom: '.5rem', 
                fontWeight: '600', 
                color: '#333' 
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1.5px solid #ddd',
                fontSize: '1rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '0.6rem',
              border: 'none',
              backgroundColor: '#27ae60',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(39, 174, 96, 0.4)',
            }}
          >
            Entrar
          </button>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <span style={{ color: '#666' }}>¿No tienes cuenta? </span>
            <Link to="/register" style={{ color: '#27ae60', fontWeight: '600', textDecoration: 'none' }}>
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
