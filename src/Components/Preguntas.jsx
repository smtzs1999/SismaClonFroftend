import React, { useState } from 'react';

const Preguntas = () => {
  const [abrirPreguntas, setAbrirPreguntas] = useState(null);

  const faqs = [
    {
      pregunta: '¿Como puedo agendar una cita médica?',
      respuesta:
        'Puedes agendar una cita directamente desde nuestro formulario en la página principal seleccionando el doctor y la fecha de tu preferencia',
    },
    {
    pregunta:'¿Que especialidades ofrecen?',
    respuesta:'¿Contamos con pediatra,cardiologia,neurologia y medicina general',
    },
    {
      pregunta:'¿Aceptan seguros medicos?',
      respuesta:'Te recomendamos contactarnos directamente paa verificar si acept amos tu piliza',
    },
    {
      pregunta:'¿Donde estan ubicados?',
      respuesta:'Nos encontramos en la direccion del mapa del sitio,el horario de atencion es de lunes a viernes de 9:00 a.m a 8:00 p.m'
    }
  ];

  const toggle = (i) => {
    setAbrirPreguntas(abrirPreguntas === i ? null : i);
  };

  return (
    <section
      style={{
        minHeight: 'auto',
        background: 'linear-gradient(135deg,#f1f5f9,#fffffffde)',
        padding: '2rem 1rem',
        fontFamily: 'Inter, sans-serif',
        fontweight: '500',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          maxWidth: 1300,
          width: '100%',
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
          
            fontWeight: 600,
            marginBottom: '1.5rem',
            color: '#222',
          }}
        >
          Preguntas 
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {faqs.map(({ pregunta, respuesta }, i) => {
            const abierto = abrirPreguntas === i;
            return (
              <div
                key={i}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: 12,
                  padding: '0.75rem 1rem',
                  cursor: 'pointer',
                  backgroundColor: abierto ? '#e0f0ff' : '#ffffff',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => toggle(i)}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600',
                    color: abierto ? '#1eaa17' : '#333',
                    fontSize: '1rem',
                    userSelect: 'none',
                  }}
                >
                  {pregunta}
                  <span
                    style={{
                      display: 'inline-block',
                      transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      fontSize: '1.1rem',
                      color: '#7cc576',
                      marginLeft: 8,
                    }}
                  >
                    ▼
                  </span>
                </div>
                {abierto && (
                  <p
                    style={{
                      marginTop: '0.6rem',
                      color: '#555',
                      fontSize: '0.9rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {respuesta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Preguntas;
