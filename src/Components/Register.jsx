import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import heartImage from '../assets/fondo/fondo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    edad: '',
    telefono: '',
    curp: '',
    nss: '',
    tipoSangre: '',
    correo: '',
    password: '',
    fotoPerfil: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        fotoPerfil: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    const fechaEmision = new Date().toLocaleDateString('es-MX');
    const rawQrText = `
===== GAFETE DIGITAL =====

Nombre: ${formData.nombre}
--------------------------
Edad: ${formData.edad}
--------------------------
Teléfono: ${formData.telefono}
--------------------------
CURP: ${formData.curp}
--------------------------
NSS: ${formData.nss}
--------------------------
Tipo de Sangre: ${formData.tipoSangre}
--------------------------
Correo: ${formData.correo}
--------------------------
Dirección: ${formData.direccion}
--------------------------
Emitido: ${fechaEmision}
`.trim();

    const qr_datos = encodeURIComponent(rawQrText);

    fetch('http://localhost:3001/api/guardar-imagen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imagen: formData.fotoPerfil,
        correo: formData.correo
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('📦 Imagen guardada en MongoDB:', data);

        emailjs.send(
          'service_hzfyjks',
          'template_pj40evm',
          {
            to_name: formData.nombre,
            nombre: formData.nombre,
            direccion: formData.direccion,
            edad: formData.edad,
            telefono: formData.telefono,
            curp: formData.curp,
            nss: formData.nss,
            tipo_sangre: formData.tipoSangre,
            correo: formData.correo,
            fecha_emision: fechaEmision,
            qr_datos,
            foto: formData.fotoPerfil
          },
          'F17ZBXqWR_0PuFbmR'
        )
          .then(() => {
            alert('✅ Registro exitoso y gafete enviado por correo.');
            setFormData({
              nombre: '',
              direccion: '',
              edad: '',
              telefono: '',
              curp: '',
              nss: '',
              tipoSangre: '',
              correo: '',
              password: '',
              fotoPerfil: ''
            });
            navigate('/login');
          })
          .catch((error) => {
            console.error('❌ Error enviando correo:', error);
            alert('Registro exitoso, pero no se pudo enviar el gafete.');
            navigate('/login');
          });
      })
      .catch(err => {
        console.error('❌ Error al guardar imagen:', err);
        alert('Error al guardar la imagen. Intenta nuevamente.');
      });
  };

  return (
    <div style={{
      minHeight: '80vh',
      padding: '20px 80px',
      backgroundColor: '#f5faf7',
      minWidth: '180vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.6rem',
        color: '#fff',
        letterSpacing: '0.2em',
        backgroundColor: '#2F5233',
        padding: '16px 40px',
        borderRadius: '10px',
        marginBottom: '30px',
        fontWeight: 600
      }}>
        BIENVENIDOS
      </h1>

      <div style={{
        maxWidth: '1400px',
        width: '95%',
        display: 'flex',
        backgroundColor: '#d9dbd9ff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.21)',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
        <form onSubmit={handleSubmit} style={{
          flexBasis: '60%',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>Registro de Usuario</h2>
          <p style={{ textAlign: 'center', color: '#555' }}>Por favor llena los siguientes campos</p>

          {['nombre', 'direccion', 'edad', 'telefono', 'curp', 'nss', 'tipoSangre', 'correo', 'password'].map((field) => {
            const placeholders = {
              nombre: 'Nombre Completo',
              direccion: 'Dirección',
              edad: 'Edad',
              telefono: 'Teléfono',
              curp: 'CURP',
              nss: 'Sistema Nacional de Seguridad',
              tipoSangre: 'Tipo de Sangre',
              correo: 'Correo Electrónico',
              password: 'Contraseña'
            };
            return (
              <input
                key={field}
                name={field}
                type={field === 'correo' ? 'email' : field === 'edad' ? 'number' : field === 'password' ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholders[field]}
                required={['nombre', 'edad', 'correo', 'password', 'direccion'].includes(field)}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  color: 'black',
                  fontSize: '1rem',
                  textTransform: ['curp', 'tipoSangre'].includes(field) ? 'uppercase' : 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}

          <label style={{ fontWeight: 'bold' }}>Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              backgroundColor: 'white',
              fontSize: '1rem'
            }}
          />

          <button type="submit" style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            padding: '14px',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}>
            Registrarme
          </button>
        </form>

        <div style={{
          flexBasis: '40%',
          backgroundImage: `url(${heartImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }} />
      </div>
    </div>
  );
};

export default Register;
