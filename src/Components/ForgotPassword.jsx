import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

const ForgotPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendEmail = async () => {
    if (sending) return;

    if (!email || !email.includes("@")) {
      setMessage("Ingresa un correo válido.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userFound = users.find(
      (user) => user?.correo?.toLowerCase() === email.toLowerCase()
    );

    if (!userFound) {
      setMessage("El correo no existe en la base de datos.");
      return;
    }

    setSending(true);
    setMessage("");

    // token
    const resetToken = uuidv4();
    localStorage.setItem(`resetToken_${userFound.correo}`, resetToken);


    const baseUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
    const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(
      userFound.correo
    )}`;

    console.log("Token generado:", resetToken);
    console.log("Link enviado:", resetLink);



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
        setMessage("Faltan variables de entorno para el envío de correo.");
        setSending(false);
        return;
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage("Correo enviado exitosamente. Revisa tu bandeja.");
    } catch (error) {
      console.error("Error al enviar correo:", error);
      setMessage("Hubo un error al enviar el correo.");
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
        zIndex: 9999,
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
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          id="email"
          type="email"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSendEmail}
          disabled={sending}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: sending ? "#a0d5a5" : "#45B36B",
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
