import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import heartImage from '../assets/fondo/img.jpeg';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    curp: '',
    direccion: '',
    telefono: '',
    nss: '',
    tipoSangre: '',
    correo: '',
    password: '',
    fotoPerfil: '',
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
CURP: ${formData.curp}
--------------------------
DIRECCION: ${formData.direccion}
--------------------------
Teléfono: ${formData.telefono}
--------------------------
NSS: ${formData.nss}
--------------------------
Tipo de Sangre: ${formData.tipoSangre}
--------------------------
Correo: ${formData.correo}
--------------------------
Contraseña: ${formData.password}
--------------------------
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
            edad: formData.edad,
            curp: formData.curp,
            direccion: formData.direccion.slice(0, 5),
            telefono: formData.telefono,
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
              edad: '',
              curp: '',
              direccion: '',
              telefono: '',
              nss: '',
              tipoSangre: '',
              correo: '',
              password: '',
              fotoPerfil: '',
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
      minHeight: '100vh',
    padding: '20px',
    backgroundImage: `url(${heartImage})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    }}>
      <h1 style={{
        textAlign: 'center',
      fontSize: '2.5rem',
      color: '#fff',
      letterSpacing: '0.2em',
      padding: '10px 20px',
      borderRadius: '20px',
      marginBottom: '30px',
      fontWeight: 500
      }}>
        BIENVENIDOS
      </h1>

      <div style={{
        width: '100%',
      maxWidth: '1000px',
      backgroundColor: 'rgba(10, 211, 77, 0.48)',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.21)',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '0',
      }}>
        <form onSubmit={handleSubmit} style={{
          flex: '1 1 600px',
        padding: '30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        }}>
          <h2 style={{  textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: 'white', gridColumn: '1 / -1' }}>Registro</h2>
          <p style={{  textAlign: 'center', color: 'white', fontSize: '1.2rem', gridColumn: '1 / -1' }}>Por favor ingrese sus datos</p>

          {['nombre', 'edad', 'curp', 'direccion', 'telefono', 'nss', 'tipoSangre', 'correo', 'password'].map((field) => {
            const placeholders = {
              nombre: 'Nombre Completo',
              edad: 'Edad',
              curp: 'CURP',
              direccion: 'Direccion',
              telefono: 'Teléfono',
              nss: 'Sistema Nacional de Seguridad',
              tipoSangre: 'Tipo de Sangre',
              correo: 'Correo Electrónico',
              password: 'Contraseña',
            };
            return (
              <input
                key={field}
                name={field}
                type={field === 'correo' ? 'email' : field === 'edad' ? 'number' : field === 'password' ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholders[field]}
                required={['nombre', 'edad', 'correo', 'password', 'telefono', 'curp', 'direccion', 'tipoSangre', 'nss'].includes(field)}
                style={{
                  padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: 'white',
                width: '100%',
                color: 'black',
                fontSize: '1rem',
                textTransform: ['curp', 'tipoSangre'].includes(field) ? 'uppercase' : 'none',
                }}
              />
            );
          })}

          <label style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white', gridColumn: '1 / -1'  }}>Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
               padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            width: '100%',
            backgroundColor: 'white',
            fontSize: '1rem'
            }}
          />

          <button type="submit" style={{
             backgroundColor: '#fff',
          color: 'black',
          boxShadow: '4px 4px 10px green',
          padding: '14px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          gridColumn: '1 / -1',
          marginTop: '10px',
          }}>
            Registrarme
          </button>
        </form>

        <div style={{
          flex: '1 1 300px',
        display: 'none', // oculto por ahora
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }} />
      </div>
    </div>
  );
};

export default Register;
