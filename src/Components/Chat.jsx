import React, { useState } from "react";

function Chat() {
  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([]);
  const [citas, setCitas] = useState([]);
  const [esperandoCita, setEsperandoCita] = useState(false);

  // --- FUNCION DE IA SIMULADA ---
  const responderAI = (texto) => {
    const t = texto.toLowerCase();

    // Si la IA está en modo "esperando que el usuario escriba la cita"
    if (esperandoCita) {
      const nuevaCita = texto;

      setCitas([...citas, nuevaCita]);
      setEsperandoCita(false);

      return `Perfecto. He guardado tu cita: "${nuevaCita}".`;
    }

    // --- Detectar cuando el usuario quiere guardar una cita ---
    if (t.includes("guardar cita") || t.includes("agendar cita") || t.includes("cita")) {
      setEsperandoCita(true);
      return "Claro, ¿qué cita deseas guardar?";
    }

    // --- Respuestas generales ---
    if (t.includes("doctor")) return "Actualmente hay médicos disponibles en consulta general.";
    if (t.includes("emergencia")) return "Si es una emergencia real, comunícate al 911.";
    
    return "Puedo ayudarte a guardar citas.";
  };

  const enviarMensaje = () => {
    if (mensaje.trim() === "") return;

    const respuesta = responderAI(mensaje);

    setChat([
      ...chat,
      { emisor: "usuario", texto: mensaje },
      { emisor: "ai", texto: respuesta },
    ]);

    setMensaje("");
  };

  return (
    <div style={styles.layout}>
      
      {/* CHAT PRINCIPAL */}
      <div style={styles.container}>
        <h2 style={styles.title}>Asistente AI del Hospital 🏥</h2>

        <div style={styles.chatBox}>
          {chat.map((msg, i) => (
            <div
              key={i}
              style={{
                textAlign: msg.emisor === "usuario" ? "right" : "left",
                marginBottom: 10,
              }}
            >
              <p
                style={{
                  ...styles.bubble,
                  backgroundColor:
                    msg.emisor === "usuario" ? "#d1e7ff" : "#e8e8e8",
                }}
              >
                <strong>{msg.emisor === "usuario" ? "Tú" : "AI"}:</strong>{" "}
                {msg.texto}
              </p>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder={
              esperandoCita ? "Escribe la cita a guardar..." : "Escribe un mensaje..."
            }
            style={styles.input}
          />
          <button onClick={enviarMensaje} style={styles.button}>
            Enviar
          </button>
        </div>
      </div>

      {/* LISTA DE CITAS GUARDADAS */}
      <div style={styles.citasBox}>
        <h3 style={{ textAlign: "center" }}>📅 Citas Guardadas</h3>

        {citas.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>Aún no hay citas.</p>
        ) : (
          <ul>
            {citas.map((c, i) => (
              <li key={i} style={styles.citaItem}>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

// --- ESTILOS ---
const styles = {
  layout: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    flexWrap: "wrap",
  },
  container: {
    padding: 20,
    width: 400,
    border: "1px solid #ccc",
    borderRadius: 10,
    backgroundColor: "white",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    marginBottom: 15,
  },
  chatBox: {
    height: 350,
    overflowY: "scroll",
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fafafa",
  },
  bubble: {
    padding: "8px 12px",
    borderRadius: 10,
    display: "inline-block",
    maxWidth: "80%",
  },
  inputContainer: {
    display: "flex",
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },

  // PANEL DE CITAS
  citasBox: {
    width: 300,
    border: "1px solid #ccc",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
    height: 420,
    overflowY: "auto",
  },
  citaItem: {
    padding: "8px 10px",
    backgroundColor: "#f4f4f4",
    marginBottom: 10,
    borderRadius: 8,
    borderLeft: "4px solid #007bff",
  },
};

export default Chat;
