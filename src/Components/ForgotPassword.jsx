import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import Swal from 'sweetalert2';


const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
  if (sending) return;

  if (!email || !email.includes("@")) {
    Swal.fire({
      icon: 'warning',
      title: 'Correo inválido',
      timer: 2000,
      text: 'Ingresa un correo electrónico válido',
      confirmButtonColor: '#f59e0b'
    });
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userFound = users.find(
    (user) => user?.correo?.toLowerCase() === email.toLowerCase()
  );

  if (!userFound) {
    Swal.fire({
      icon: 'error',
      title: 'Correo no encontrado',
      timer: 2000,
      text: 'El correo no existe en la base de datos',
      confirmButtonColor: '#ef4444'
    });
    return;
  }

  setSending(true);

  const resetToken = uuidv4();
  localStorage.setItem(`resetToken_${userFound.correo}`, resetToken);

  const baseUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
  const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(
    userFound.correo
  )}`;

  const templateParams = {
    to_name: userFound.usuario || "Usuario",
    to_email: userFound.correo,
    reset_link: resetLink,
  };

  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      Swal.fire({
        icon: 'error',
        title: 'Configuración incompleta',
        timer: 2000,
        text: 'Faltan variables de entorno para el envío de correo',
        confirmButtonColor: '#ef4444'
      });
      setSending(false);
      return;
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey);

    Swal.fire({
      icon: 'success',
      title: 'Correo enviado',
      timer: 2000,
      text: 'Revisa tu bandeja de entrada o correo no deseado',
      confirmButtonColor: '#10b981'
    });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error al enviar',
      timer: 2000,
      text: 'Hubo un error al enviar el correo. Intenta nuevamente.',
      confirmButtonColor: '#ef4444'
    });
  } finally {
    setSending(false);
  }
};


  return (
    <div
      className="forgot-password-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(227, 228, 231, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999, 
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: 320,
          textAlign: "center",
        }}
      >
        <h2>Recuperar Contraseña</h2>
        <label htmlFor="email">Ingresa tu Correo Electrónico:</label>
        <input
          id="email"
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          style={{
            width: "80%",
            padding: "8px",
            marginTop: "8px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "white",
            color: "black"
          }}
        />
        <button
          onClick={handleSendEmail}
          disabled={sending}
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: sending ? "#002904ff" : "#1dd22aff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: sending ? "not-allowed" : "pointer",
          }}
        >
          {sending ? "Enviando..." : "Enviar"}
        </button>
        {message && <p style={{ marginTop: "12px" }}>{message}</p>}
        <button
          onClick={onClose}
          style={{
            marginTop: "12px",
            background: "none",
            border: "none",
            color: "red",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
