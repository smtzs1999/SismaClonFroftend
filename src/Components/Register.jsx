import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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

  const [guardando, setGuardando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'nombre') {
      newValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    if (name === 'edad') {
      newValue = value.replace(/\D/g, '').slice(0, 2);
    }

    if (name === 'curp') {
      newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
    }

    if (name === 'telefono') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    if (name === 'correo') {
      newValue = value.toLowerCase();
    }

     if (name === 'nss') {
      newValue = value.replace(/\D/g, '').slice(0, 11);
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
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

    const { nombre, edad, curp, telefono, correo } = formData;

    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum < 1 || edadNum > 99) {
      Swal.fire('Edad inválida', 'Debe ser un número entre 1 y 99', 'error');
      return;
    }

    if (curp.length !== 18) {
      Swal.fire('CURP inválida', 'Debe contener exactamente 18 caracteres', 'error');
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Swal.fire('Teléfono inválido', 'Debe contener exactamente 10 dígitos', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      Swal.fire('Correo inválido', 'Ingrese un correo válido', 'error');
      return;
    }
    setGuardando(true);

    
    Swal.fire({
      title: 'Guardando datos...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

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
            direccion: formData.direccion.slice(0, 250),
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
            Swal.fire({
              title: '✅ Registro exitoso',
              text: 'El gafete ha sido enviado por correo.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            }).then(() => {
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
              setGuardando(false);
              navigate('/login');
            });
          })
          .catch((error) => {
            console.error('❌ Error enviando correo:', error);
            Swal.fire('Error', 'No se pudo enviar el gafete por correo.', 'error');
            setGuardando(false);
            navigate('/login');
          });
      })
      .catch(err => {
        console.error('❌ Error al guardar imagen:', err);
        Swal.fire('Error', 'No se pudo guardar la imagen.', 'error');
        setGuardando(false);
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
      justifyContent: 'flex-start'
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
        maxWidth: '1000px',
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
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: 'white' }}>Registro</h2>
          <p style={{ textAlign: 'center', color: 'white', fontSize: '1.2rem' }}>Por favor ingrese sus datos</p>

          {['nombre', 'edad', 'curp', 'direccion', 'telefono', 'nss', 'correo', 'password'].map((field) => {
            const placeholders = {
              nombre: 'Nombre Completo',
              edad: 'Edad',
              curp: 'CURP',
              direccion: 'Direccion',
              telefono: 'Teléfono',
              nss: 'Sistema Nacional de Seguridad',
              correo: 'Correo Electrónico',
              password: 'Contraseña',
            };
            return (
              <>
              <label htmlFor={field}>{placeholders[field]}</label>
              <input
                id={field}
                key={field}
                name={field}
                type={field === 'correo' ? 'email' : field === 'edad' ? 'number' : field === 'password' ? 'password' : 'text'}
                value={formData[field]}
                onChange={handleChange}
                placeholder={placeholders[field]}
                required={['nombre', 'edad', 'correo', 'password'].includes(field)}
                maxLength={field === 'direccion' ? 250 : undefined}
                style={{
                  padding: '6px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  width: '250px',
                  height: '50px',
                  color: 'black',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  textTransform: field === 'curp' ? 'uppercase' : 'none',
                }}
              />
              
              </>

            );
          })}

          {/* Campo tipoSangre como select */}
          <label style={{ fontSize: '1rem', fontWeight: 'bold', color: 'white' }}>Tipo de Sangre:</label>
          <select
          class="form-select form-select-sm" aria-label="Small select example"
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
            required
            style={{
              padding: '6px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              width: '250px',
              height: '40px',
              color: 'black',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            <option value="" disabled>Seleccione tipo de sangre</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

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

          <button
            type="submit"
            disabled={guardando}
            style={{
              backgroundColor: guardando ? '#ccc' : '#ffffff',
              color: 'black',
              boxShadow: '10px 4px 4px green',
              padding: '14px',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: guardando ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s ease'
            }}
          >
            {guardando ? 'Guardando...' : 'Registrarme'}
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