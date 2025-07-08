import React, { useState } from "react";  
import '../Css/Styles.css';
import docImage from '../img/doc2.jpg'; 
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Footer from "./footer";
import Referencias from "./Header";
import { PopupButton } from "react-calendly";

const departamentos = [
  "General Health",
  "Cardiology",
  "Dental",
  "Neurology",
  "Orthopedics"
];

function ViewVista() {
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
      name: "",
      email: "",
      date: "",
      department: "General Health",
      phone: "",
      message: ""
  });

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
      phone: value,
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
    // Aquí puedes hacer el envío a tu backend o API
  };

    
    return( //marginLeft ni margin
      <div>
        <Referencias /> 
          <div style={{display: "flex", padding: 32}}>
            <img 
              src={docImage} 
              alt="Doctor" 
              style={{
                display:"flex",
                width: 400,
                height: "auto",
                borderRadius: 12,
                marginRight: 32,
                objectFit: "cover"
              }}
            />
            <div className="Container" style={{
                maxWidth: 900,
                background: "#fff",
                padding: 32,
                borderRadius: 12,
                boxShadow: "0 2px 12px rgb(0,0,0,0.07)",
                marginLeft: 100
              }}>
                  
              <h1 style={{ fontWeight: 700, fontSize: 36, marginBottom: 30 }}>
              Make an appointment </h1>    
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600 }}>Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600 }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600 }}>Select Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontWeight: 600 }}>Select Department</label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        style={inputStyle}
                        required
                      >
                        {departamentos.map((dep) => (
                          <option key={dep} value={dep}>{dep}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600 }}>Phone Number</label>
                    <PhoneInput
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      inputClass="mi-input-telefono"
                      required
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                  </div>
                  
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontWeight: 600 }}>Additional Message</label>
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                    />
                  </div>
                  <PopupButton
                      url="https://calendly.com/20191222-uthh/make-an-appointment"
                      rootElement={document.getElementById("root")}
                      text="Submit and Schedule"
                      prefill={{name: form.name, email: form.email,
                        customAnswers:{
                          a1: form.date,
                          a2: form.department,
                          a3: form.phone,
                          a4: form.message
                        }
                      }}
                      styles={{
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
                      onClick={() => {
                        if (form.name && form.email && form.date && form.department && form.phone && form.message ) {
                        } else {
                          alert("Por favor llena todos los campos requeridos antes de agendar.");
                          return false;
                        }
                      }}
                  />
                </form>
            </div>
          </div>
          <Footer/>
    </div>

  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 10px",
  marginTop: 6,
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  fontSize: 16,
  background: "#fff",
  color: "black"
};

export default ViewVista