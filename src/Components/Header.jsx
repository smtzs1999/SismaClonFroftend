import React from "react";
import '../Css/Styles.css';
import icoCalen from '../img/calendario.png';
import icoEmail from '../img/email.png';
import icoWhats from '../img/whatsapp.png';

const Referencias = () => {
    return(    
    <div className="topbar-container" style={{borderBottom:'3px solid #eee'}}>
      <div className="topbar-item">
        Welcome to a Professional Health Care
      </div>
      <div className="topbar-item">
        <a
            href="https://api.whatsapp.com/send?phone=528110308686&text=Hola%20quiero%20contactarte"
            target="_blank"
            rel="noopener noreferrer"
        >
        <img width="30" height="30" src={icoWhats} alt="WhatsApp"/>
        </a>WhatSapp
      </div>
      <div className="topbar-item">
        <img width="25" height="25" src="https://img.icons8.com/color/48/phone.png" alt="phone"/>
        010-060-0160
      </div>
      <div className="topbar-item">
        <img width="25" height="25" src={icoCalen} alt="calendar--v1"/>
        6:00 AM - 10:00PM (Mon-Fri)
      </div>
      <div className="topbar-item">
        <img width="25" height="25" src={icoEmail} alt="new-post"/>
        Info@company.com
      </div>
    </div>
    

    )
}

export default Referencias;