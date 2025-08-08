import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import heartImage from '../assets/fondo/img.jpeg';
import './register.css';

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
    newValue = value
      .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '') 
      .replace(/\s{2,}/g, ' ');
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
      newValue = value.toLowerCase().replace(/\s/g, '');
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

    const { nombre, edad, curp, telefono, correo, nss } = formData;

    const edadNum = parseInt(edad, 10);
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) || nombre.trim().length < 2) {
      Swal.fire('Nombre inválido', 'El nombre solo debe contener letras y tener al menos 2 caracteres', 'error');
      return;
    }
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
    if (!/^\d{11}$/.test(nss)) {
      Swal.fire('NSS inválido', 'Debe contener exactamente 11 dígitos', 'error');
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
      .then(() => {
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
    <div className="container" style={{ backgroundImage: `url(${heartImage})` }}>
      <h1 className="title">BIENVENIDOS</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h2>Registro</h2>
          <p>Por favor ingrese sus datos</p>

          {['nombre', 'edad', 'curp', 'direccion', 'telefono', 'nss', 'correo', 'password'].map(field => {
            const placeholders = {
              nombre: 'Nombre Completo',
              edad: 'Edad',
              curp: 'CURP',
              direccion: 'Dirección',
              telefono: 'Teléfono',
              nss: 'Sistema Nacional de Seguridad',
              correo: 'Correo Electrónico',
              password: 'Contraseña',
            };
            return (
              <div key={field}>
                <label htmlFor={field}>{placeholders[field]}</label>
                <input
                  id={field}
                  name={field}
                  type={
                    field === 'correo' ? 'email' :
                      field === 'edad' ? 'number' :
                        field === 'password' ? 'password' : 'text'
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={placeholders[field]}
                  required={['nombre', 'edad', 'correo', 'password'].includes(field)}
                  maxLength={field === 'direccion' ? 250 : undefined}
                  className={field === 'curp' ? 'curp' : ''}
                />
              </div>
            );
          })}

          <label>Tipo de Sangre:</label>
          <select
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
            required
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

          <label>Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit" disabled={guardando} className="button-submit">
            {guardando ? 'Guardando...' : 'Registrarme'}
          </button>
        </form>
        <div className="image-wrapper" />
      </div>
    </div>
  );
};

export default Register;
