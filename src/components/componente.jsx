import React from "react";
import doctorPhoto from "../assets/sistema/doctores/doctor10.jpg";

const DoctorCard = () => {
  return (
    <div className="doctor-card">
      <img src={doctorPhoto} alt="Dr. Neil Jackson" className="doctor-photo" />
      <div className="doctor-details">
        <div className="doctor-name">Dra. Maricarmen Reyes</div>
        <div className="doctor-title">Médico General</div>
      </div>
    </div>
  );
};

export default DoctorCard;
