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

    // Validaciones...

    setGuardando(true);
    Swal.fire({
      title: 'Guardando datos...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // Guardado en localStorage, envío de correo, etc.

    // Después acciones con Swal y navegaciones
  };

  return (
    <div
      className="container"
    >
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
              direccion: 'Direccion',
              telefono: 'Teléfono',
              nss: 'Sistema Nacional de Seguridad',
              correo: 'Correo Electrónico',
              password: 'Contraseña',
            };
            return (
              <React.Fragment key={field}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>




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
                
              </React.Fragment>
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

          <button
            type="submit"
            disabled={guardando}
            className="button-submit"
          >
            {guardando ? 'Guardando...' : 'Registrarme'}
          </button>
        </form>

        <div className="image-wrapper" />
      </div>
    </div>
  );
};

export default Register;
