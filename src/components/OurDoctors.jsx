import React, { useEffect, useState, useRef } from "react";
import { Separador } from "./Separador";
import "../Css/OurDoctors.css";

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
  const [cardsPerView, setCardsPerView] = useState(3);

  // Actualizar cuántas cards mostrar según ancho
  const updateCardsPerView = () => {
    const width = window.innerWidth;
    if (width < 576) {
      setCardsPerView(1);
    } else if (width < 992) {
      setCardsPerView(2);
    } else {
      setCardsPerView(3);
    }
  };

  useEffect(() => {
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Avanzar automáticamente al siguiente card (uno por uno)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // Nuevo índice
        const next = prev + 1;
        // Si el último índice que mostraría excede la cantidad total, reinicia
        if (next + cardsPerView > doctorsData.length) {
          return 0;
        }
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [cardsPerView]);

  // Obtener las cards que se van a mostrar (corte uno por uno)
  const visibleDoctors = doctorsData.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  return (
    <div
      className="inter-medium"
      style={{ maxWidth: "1140px", margin: "0 auto", padding: "0 10px",textAlign: "left" }}
    >
    <div style={{ marginLeft: "50px" }}>
    <Separador title="Our Doctors" />
    </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          transition: "all 0.5s ease",
        }}
      >
        {visibleDoctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              flex: "0 0 auto",
              width:
                cardsPerView === 1
                  ? "100%"
                  : cardsPerView === 2
                  ? "47%"
                  : "28%",
              boxSizing: "border-box",
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
              <div style={{ padding: "16px", textAlign: "left", flex: 1 }}>
                <h3 style={{ margin: "8px 0 4px", fontWeight: "bold" }}>
                  {doctor.name}
                </h3>
                <p style={{ margin: "4px 0" }}>{doctor.area}</p>
                <p style={{ margin: "30px 0 4px" }}>📞 {doctor.phone}</p>
                <p
                  style={{
                    margin: "4px 0",
                    display: "flex",
                    alignItems: "center",
                    wordBreak: "break-all",
                  }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDV-6Oji13RF1SIO3MLEQa3-8x77r7T-rDSw&s"
                    alt="email"
                    style={{
                      width: "16px",
                      height: "16px",
                      marginRight: "6px",
                    }}
                  />
                  {doctor.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
