import React, { useState } from "react";  
import '../Css/Styles.css';
import docImage from '../img/doc2.jpg'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from "./footer";

const departamentos = [
  "General Health",
  "Cardiology",
  "Dental",
  "Neurology",
  "Orthopedics"
];

function ViewVista() {
  
  const [error, setError] = useState("");

  const [form, setForm] = useState({
      name: "",
      email: "",
      department: "General Health",
      phone: "",
      message: ""
  });

  const limpiarFormulario = () => {
    setForm({
      name: "",
      email: "",
      department: "General Health",
      phone: "",
      message: ""
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado general del formulario
    setForm({
      ...form,
      [name]: value,
    });

  };
    
  const handlePhoneChange = (value) => {
    // Actualizar el estado general del formulario
    setForm({
      ...form,
      phone:value,
    });

    const onlyNumbers = typeof value === "string" ? value.replace(/\D/g, "") : "";

    // Validar solo si el campo que cambia es "telefono" (o el nombre que uses)
    if(onlyNumbers.length === 12){
      setError("");
    }else{
      setError('El número de teléfono debe tener 10 dígitos.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const onlyNumbers = form.phone.replace(/\D/g, "");
    if (onlyNumbers.length !== 10) {
      setError("Por favor, ingresa un número de teléfono válido de 10 dígitos.");
      return;
    }

    setError("");
    alert("Formulario enviado con éxito:\n" + JSON.stringify(form, null, 2));
    
  };

    
    return( //marginLeft ni margin
      <div >
          <div className="Container-Principal">
            <img src={docImage} alt="Doctor"/>
            <div className="Formulario">  
              <h1>Make an appointment</h1>    
                <form onSubmit={handleSubmit}>
                  <div className="Formulario-item">
                    <div>
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="nombre"
                        value={form.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="correo electronico"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                  <div className="Formulario-item">
                    <div>
                      <label>Selecciona el Departamento</label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        style={{
                          ...inputStyle,
                          padding: "8px 15px",
                          fontSize: 16,
                          background: "#fff",
                          color: "black", 
                          width: '115%',
                        }}

                        required
                      >
                        {departamentos.map((dep) => (
                          <option key={dep} value={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{marginBottom: 18 }}>
                    <div>
                      <label style={{ fontWeight: 600}}>Numero telefonico</label>
                    <PhoneInput
                      country={'mx'}
                      placeholder="telefono"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      inputClass="mi-input-telefono"
                      containerClass="mi-contenedor-telefono"
                      required
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </div >
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontWeight: 600 }}>Mensaje adicional</label>
                    <textarea
                      name="message"
                      placeholder="Mensaje"
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle, minHeight: 80, resize: "none" }}
                    />
                  </div>
                  <button
                    style={{
                    width: "100%",
                    background: "#1eaa17",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 18,
                    padding: "16px 0",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    textAlign: "center",
                    display: "block"
                  }}
                  onClick={async () => {
                    if (form.name && form.email && form.department && form.phone && form.message) {
                      const baseUrl = "https://calendly.com/20191222-uthh/make-an-appointment";
                      
                      const urlConDatos = `${baseUrl}?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&a1=${encodeURIComponent(form.department)}&a2=${encodeURIComponent(form.phone)}&a3=${encodeURIComponent(form.message)}`;

                      window.open(urlConDatos, "_blank");
                      try {
                          const response = await fetch("http://localhost:3001/send-email", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(form),
                          });

                          const result = await response.json();

                          if (response.ok) {
                            alert("Correo personalizado enviado con éxito.");
                          } else {
                            alert("Error al enviar el correo: " + result.message);
                          }
                        } catch (error) {
                          console.error("Error al conectar con el servidor:", error);
                          alert("No se pudo enviar el correo.");
                        }
                        limpiarFormulario();
                    } else {
                      alert("Por favor llena todos los campos requeridos antes de agendar.");
                    }
                    
                  }}
                
                >
                  Enviar
                </button>
                </form>
            </div>
          </div>
      <div className="mapa-responsive">
      <iframe
        title="Ubicación en Google Maps"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d10829.496609864684!2d-98.67107105000001!3d20.670868199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2smx!4v1752025683683!5m2!1ses!2smx"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>
        <Footer/>
    </div>

  );
}

const inputStyle = {

  width: "100%",
  padding: "5px ",
  marginTop: 6,
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  fontSize: 16,
  background: "#fff",
  color: "black",
};


export default ViewVista