import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import heartImage from '../assets/fondo/img.jpeg';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    curp: '',
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
      padding: '20px 80px',
      backgroundImage: `url(${heartImage})`,
      backgroundSize: 'cover',
      display: 'flex',
      minWidth: '180vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '3.0rem',
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
        maxWidth: '600px',
        width: '45%',
        display: 'flex',
        backgroundColor: 'rgba(10, 211, 77, 0.48)',
        borderRadius: '5px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.21)',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
        <form onSubmit={handleSubmit} style={{
          flexBasis: '60%',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: 'white'}}>Registro</h2>
          <p style={{ textAlign: 'center', color: 'white', fontSize: '1.2rem'}}>Por favor ingrese sus datos</p>

          {['nombre', 'edad', 'curp', 'telefono', 'nss', 'tipoSangre', 'correo', 'password'].map((field) => {
            const placeholders = {
              nombre: 'Nombre Completo',
              edad: 'Edad',
              curp: 'CURP',
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
                required={['nombre', 'edad', 'correo', 'password'].includes(field)}
                style={{
                  padding: '6px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  width: '250px',
                  height: '50px',
                  color: 'black',
                  fontSize: '1rem',
                  textTransform: ['curp', 'tipoSangre'].includes(field) ? 'uppercase' : 'none',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}

          <label style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              width: '250px',
              height: '50px',
              backgroundColor: 'white',
              fontSize: '1rem'
            }}
          />

          <button type="submit" style={{
            backgroundColor: '#ffffffff',
            color: 'black',
            boxShadow: '10px 4px 4px green',
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
