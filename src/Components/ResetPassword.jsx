import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email || !token) {
      setMessage('Token o correo electrónico faltante.');
      return;
    }

    const storedToken = localStorage.getItem(`resetToken_${email}`);
    if (storedToken !== token) {
      setMessage('Token inválido o expirado.');
    }
  }, [email, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage('Por favor completa ambos campos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(
      (user) => user?.correo?.toLowerCase() === email?.toLowerCase()
    );

    if (userIndex === -1) {
      setMessage('Usuario no encontrado.');
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem(`resetToken_${email}`);

    setMessage('Contraseña actualizada con éxito. Redirigiendo al login...');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Restablecer Contraseña</h2>
        {message && <p style={styles.message}>{message}</p>}
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Guardar Contraseña</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#dededeff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    background: '#fff',
    padding: '50px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    marginBottom: '10px',
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '3px solid #ccc',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#4aa147ff',
    color: '#fff',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    color: '#e53935',
  },
};

export default ResetPassword;
  