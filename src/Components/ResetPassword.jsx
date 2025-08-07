import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!email || !token) {
      Swal.fire({
        title: 'Error',
        text: 'Token o correo electrónico faltante.',
        icon: 'error'
      });
      return;
    }

    const storedToken = localStorage.getItem(`resetToken_${email}`);
    if (storedToken !== token) {
      Swal.fire({
        title: 'Error',
        text: 'Token inválido o expirado.',
        icon: 'error'
      });
    }

    window.history.replaceState({}, document.title, 'reset/-password');
  }, [email, token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor completa ambos campos.',
        icon: 'warning'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error'
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        title: 'Contraseña muy corta',
        text: 'Debe tener al menos 6 caracteres.',
        icon: 'warning'
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(
      (user) => user?.correo?.toLowerCase() === email?.toLowerCase()
    );

    if (userIndex === -1) {
      Swal.fire({
        title: 'Error',
        text: 'Usuario no encontrado.',
        icon: 'error'
      });
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem(`resetToken_${email}`);

    Swal.fire({
      title: 'Contraseña actualizada',
      text: 'Redirigiendo al login...',
      icon: 'success',
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false
    });

    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Restablecer Contraseña</h2>
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
    color: 'black',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '3px solid #ccc',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: '#22d31cff',
    color: '#fff',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ResetPassword;
