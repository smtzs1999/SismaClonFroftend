import React, { useEffect, useState, useRef } from "react";
import { Separador } from "./Separador";

import doctor1 from "../assets/sistema/doctores/doctor1.jpg";
import doctor2 from "../assets/sistema/doctores/doctor2.jpg";
import doctor3 from "../assets/sistema/doctores/doctor3.jpg";
import doctor4 from "../assets/sistema/doctores/doctor4.jpg";
import doctor5 from "../assets/sistema/doctores/doctor5.jpg";
import doctor6 from "../assets/sistema/doctores/doctor6.jpg";
import doctor7 from "../assets/sistema/doctores/doctor7.jpg";
import doctor8 from "../assets/sistema/doctores/doctor8.jpg";
import doctor9 from "../assets/sistema/doctores/doctor9.jpg";


const doctorsData = [
  { id: 1, name: "Ana López", area: "Cardiología", phone: "+52 123 456 7890", email: "ana.lopez@hospital.com", image: doctor1 },
  { id: 2, name: "Juana Pérez", area: "Dermatología", phone: "+52 987 654 3210", email: "juana.perez@hospital.com", image: doctor2 },
  { id: 3, name: "María García", area: "Pediatría", phone: "+52 555 123 4567", email: "maria.garcia@hospital.com", image: doctor3 },
  { id: 4, name: "Carla Ruiz", area: "Neurología", phone: "+52 444 987 6543", email: "carla.ruiz@hospital.com", image: doctor4 },
  { id: 5, name: "Laurino Gómez", area: "Oncología", phone: "+52 333 222 1111", email: "laurino.gomez@hospital.com", image: doctor5 },
  { id: 6, name: "Sandra Torres", area: "Ginecología", phone: "+52 222 333 4444", email: "sandra.torres@hospital.com", image: doctor6 },
  { id: 7, name: "Erick Méndez", area: "Psiquiatría", phone: "+52 111 555 6666", email: "erick.mendez@hospital.com", image: doctor7 },
  { id: 8, name: "Miguel Vargas", area: "Traumatología", phone: "+52 777 888 9999", email: "miguel.vargas@hospital.com", image: doctor8 },
  { id: 9, name: "Patric Salinas", area: "Endocrinología", phone: "+52 666 777 8888", email: "patric.salinas@hospital.com", image: doctor9 },
];

export const OurDoctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const allDoctors = [...doctorsData, ...doctorsData];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / 3;
    container.style.transition = "transform 0.5s ease";
    container.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    if (currentIndex >= doctorsData.length) {
      setTimeout(() => {
        container.style.transition = "none";
        container.style.transform = "translateX(0)";
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex]);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      
      <Separador title="Our Doctors"/>

      {/* Carrusel */}
      <div
        className="carrusel-tipografia"
        style={{
          overflow: "hidden",
        }}
      >
        <div
          ref={containerRef}
          style={{
            display: "flex",
          }}
        >
          {allDoctors.map((doctor, index) => (
            <div
              key={index}
              style={{
                flex: "0 0 33.33%",
                boxSizing: "border-box",
                padding: "0 12px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "0",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
                <div style={{ padding: "16px", textAlign: "left" }}>
                  <h3 style={{ margin: "8px 0 4px", fontWeight: "bold" }}>
                    {doctor.name}
                  </h3>
                  <p style={{ margin: "4px 0", fontWeight: "normal" }}>
                    {doctor.area}
                  </p>
                  <p
                    style={{
                      margin: "30px 0 4px",
                      fontWeight: "normal",
                    }}
                  >
                    📞 {doctor.phone}
                  </p>
                  <p
                    style={{
                      margin: "4px 0",
                      display: "flex",
                      alignItems: "center",
                      wordBreak: "break-all",
                      fontWeight: "normal",
                    }}
                  >
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDV-6Oji13RF1SIO3MLEQa3-8x77r7T-rDSw&s"
                      alt="email icon"
                      style={{ width: "16px", height: "16px", marginRight: "6px" }}
                    />
                    {doctor.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
