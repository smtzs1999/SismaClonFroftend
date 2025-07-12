import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [curp, setCurp] = useState('');
  const [nss, setNss] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ nombreCompleto, edad, telefono, curp, nss, tipoSangre, correo, password });
    localStorage.setItem('users', JSON.stringify(users));

    const fechaEmision = new Date().toLocaleDateString('es-MX');

    const rawQrText = `
===== GAFETE DIGITAL =====

Nombre: ${nombreCompleto}
--------------------------
Edad: ${edad}
--------------------------
Teléfono: ${telefono}
--------------------------
CURP: ${curp}
--------------------------
NSS: ${nss}
--------------------------
Tipo de Sangre: ${tipoSangre}
--------------------------
Correo: ${correo}
--------------------------
Emitido: ${fechaEmision}
`.trim();

    const qr_datos = encodeURIComponent(rawQrText);

    const templateParams = {
      to_name: nombreCompleto,
      nombre_completo: nombreCompleto,
      name: nombreCompleto,
      edad,
      telefono,
      curp,
      nss,
      tipo_sangre: tipoSangre,
      correo,
      fecha_emision: fechaEmision,
      qr_datos
    };

    emailjs.send(
      'service_hzfyjks',
      'template_pj40evm',
      templateParams,
      'F17ZBXqWR_0PuFbmR'
    )
    .then(() => {
      alert('✅ Registro exitoso y gafete enviado por correo.');
      setNombreCompleto('');
      setEdad('');
      setTelefono('');
      setCurp('');
      setNss('');
      setTipoSangre('');
      setCorreo('');
      setPassword('');
      navigate('/login');
    })
    .catch((error) => {
      console.error('❌ Error enviando correo:', error);
      alert('Registro exitoso, pero no se pudo enviar el gafete.');
      navigate('/login');
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        padding: 24,
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Registro de Usuario</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="text" placeholder="Nombre completo" value={nombreCompleto} onChange={e => setNombreCompleto(e.target.value)} required style={{ padding: 10, fontSize: 16 }} />
          <input type="number" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} required style={{ padding: 10, fontSize: 16 }} min="0" />
          <input type="tel" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} style={{ padding: 10, fontSize: 16 }} />
          <input type="text" placeholder="CURP" value={curp} onChange={e => setCurp(e.target.value)} style={{ padding: 10, fontSize: 16, textTransform: 'uppercase' }} />
          <input type="text" placeholder="NSS" value={nss} onChange={e => setNss(e.target.value)} style={{ padding: 10, fontSize: 16 }} />
          <input type="text" placeholder="Tipo de sangre" value={tipoSangre} onChange={e => setTipoSangre(e.target.value)} style={{ padding: 10, fontSize: 16, textTransform: 'uppercase' }} />
          <input type="email" placeholder="Correo electrónico" value={correo} onChange={e => setCorreo(e.target.value)} required style={{ padding: 10, fontSize: 16 }} />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: 10, fontSize: 16 }} />
          <button type="submit" style={{
            marginTop: 10,
            padding: '12px 0',
            fontSize: 18,
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer'
          }}>Registrarme</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
