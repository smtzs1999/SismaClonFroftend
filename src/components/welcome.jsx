import React from "react";
import "./HealthCenter.css";
import doctorImage from "../assets/sistema/doctores/doctor4.jpg";
import imgDoc from "../assets/sistema/doctores/doctor2.jpg";

export const HealthCenter = () => {
  return (
    <div className="container">
      <div className="text-content">
        <h1>Welcome to your health center</h1>
        <p>
          En nuestro centro, tu bienestar es nuestra prioridad. Contamos con un
          equipo médico altamente capacitado, comprometido con brindarte
          atención de calidad, cercana y humana. Ya sea que vengas para una
          consulta general, un chequeo preventivo o un tratamiento
          especializado, estamos aquí para cuidarte en cada paso del camino.
          Gracias por confiar en nosotros. ¡Estamos para servirte!
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "45px",
          }}
        >
          <img
            width="60"
            height="60"
            src={imgDoc}
            alt="Dra. Maricarmen Reyes"
            style={{ borderRadius: "60%", marginRight: "20px" }}
          />
          <div>
            <strong>Dra. Maricarmen Reyes</strong>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              Médico General
            </p>
          </div>
        </div>
      </div>

      <div className="image-content">
        <img src={doctorImage} alt="Doctora Maricarmen Reyes" />
      </div>
    </div>
  );
};

// export default HealthCenter;