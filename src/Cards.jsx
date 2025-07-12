import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from './assets/sistema/LasNews/img1.png';
import img2 from './assets/sistema/LasNews/img2.png';
import img3 from './assets/sistema/LasNews/img3.png';
import img4 from './assets/sistema/LasNews/img4.png';
import img5 from './assets/sistema/LasNews/img5.png';
import img6 from './assets/sistema/LasNews/img6.png';

import doc1 from './assets/sistema/Doctor/doc1.png';
import doc2 from './assets/sistema/Doctor/doc2.png';
import doc3 from './assets/sistema/Doctor/doc3.png';
import doc4 from './assets/sistema/Doctor/doc4.png';
import doc5 from './assets/sistema/Doctor/doc5.png';
import doc6 from './assets/sistema/Doctor/doc6.png';

const noticias = [
  {
    id: 1,
    titulo: "Urge vencer los miedos para ganarle la batalla al cáncer de próstata en México",
    descripcion: "La importancia de derribar mitos y tabúes en torno al cáncer de próstata para fomentar la detección temprana y mejorar la calidad de vida de los pacientes.",
    fecha: "24 de Enero del 2025",
    autor: "• CEO / Clinica SF",
    imagen: img1,
    contenido: "Doc. Juan Fundador y creador de la clinica SF",
    fotoPerfil: doc4,
    nombreExtra: "Doc. Juan"
  },
  {
    id: 2,
    titulo: "Aumento de casos de Tos ferina en México",
    descripcion: "Un análisis sobre las causas detrás del repunte de casos de tos ferina y las medidas preventivas recomendadas para proteger a la población vulnerable.",
    fecha: "26 de Marzo del 2016",
    autor: "• Director General",
    imagen: img2,
    contenido: "Doc. James Director General de la clinica SF",
    fotoPerfil: doc2,
    nombreExtra: "Doc. James"
  },
  {
    id: 3,
    titulo: "SE PUBLICÓ EL PROGRAMA NACIONAL DE INFRAESTRUCTURA DE LA CALIDAD 2025",
    descripcion: "Un nuevo plan estratégico que busca fortalecer los estándares y regulaciones para garantizar servicios y productos con altos niveles de calidad en todo el país.",
    fecha: "25 de Febrero del 2025",
    autor: "• Asistente Regional",
    imagen: img3,
    contenido: "Doc. Pedro Asistente Regional del consejo",
    fotoPerfil: doc3,
    nombreExtra: "Doc. Pedro"
  },
  {
    id: 4,
    titulo: "25% de las mujeres sufren afecciones oculares a causa del maquillaje o productos diseñados para la zona ocular",
    descripcion: "Estudio reciente revela que una gran parte de las mujeres experimentan irritaciones y alergias por el uso inapropiado o excesivo de cosméticos para los ojos.",
    fecha: "27 de Enero del 2025",
    autor: "• Asistente Direccion",
    imagen: img4,
    contenido: "Doc. Teresa Asistente de la Direccion de Medicina",
    fotoPerfil: doc1,
    nombreExtra: "Doc. Teresa"
  },
  {
    id: 5,
    titulo: "Vacuna contra el Virus Sincicial Respiratorio en México",
    descripcion: "El lanzamiento y distribución de la vacuna contra el VSR, un avance importante para prevenir infecciones respiratorias graves en bebés y adultos mayores.",
    fecha: "27 de Febrero del 2024",
    autor: "• Especialista Ocular",
    imagen: img5,
    contenido: "Doc. Francisco Especialista ocular de la clinica SF",
    fotoPerfil: doc5,
    nombreExtra: "Doc. Francisco"
  },
  {
    id: 6,
    titulo: "Alianza Contra la Muerte Súbita Cardíaca",
    descripcion: "Una iniciativa conjunta entre instituciones médicas y gubernamentales para aumentar la prevención y respuesta ante episodios de muerte súbita cardíaca en la población.",
    fecha: "1 de Marzo del 2025",
    autor: "• Dentista",
    imagen: img6,
    contenido: "Doc. Juvencio Dentista de la clinica SF",
    fotoPerfil: doc6,
    nombreExtra: "Doc. Juvencio"
  }
];

function Carrusel() {
  const [indiceInicio, setIndiceInicio] = useState(0);
  const [numVisibles, setNumVisibles] = useState(3);
  const navegar = useNavigate();

  useEffect(() => {
    function actualizarVisibles() {
      const ancho = window.innerWidth;
      if (ancho < 576) setNumVisibles(1);
      else if (ancho < 992) setNumVisibles(2);
      else setNumVisibles(3);
    }

    actualizarVisibles();
    window.addEventListener('resize', actualizarVisibles);
    return () => window.removeEventListener('resize', actualizarVisibles);
  }, []);

  function siguiente() {
    setIndiceInicio(prev => (prev >= noticias.length - numVisibles ? 0 : prev + 1));
  }

  function anterior() {
    setIndiceInicio(prev => (prev <= 0 ? noticias.length - numVisibles : prev - 1));
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      siguiente();
    }, 3000);
    return () => clearInterval(intervalo);
  }, [numVisibles]);

  const visibles = [];
  for (let i = 0; i < numVisibles; i++) {
    visibles.push(noticias[(indiceInicio + i) % noticias.length]);
  }

  return (
    <div className="container py-3">
      <style>{`
        .texto-corto {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 600;
          font-size: 1rem;
          color: #212529;
        }
        .card-descripcion {
          text-align: justify;
          margin-top: 0.4rem;
          font-size: 0.92rem;
          color: #555;
        }
        .img-fija {
          height: 200px;
          width: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .img-perfil {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          object-position: top;
          display: block;
          border: 2px solid #e0e0e0;
        }
        .autor-detalle {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }
        .autor-nombre {
          font-weight: 600;
          font-size: 0.88rem;
          color: #333;
        }
        .autor-rol {
          font-size: 0.76rem;
          color: #888;
        }
        @media (max-width: 576px) {
          .img-fija { height: 160px; }
          .texto-corto { font-size: 0.95rem; }
          .card-descripcion { font-size: 0.85rem; }
        }
      `}</style>

      <h2 className="text-center mb-5">Últimas Noticias</h2>
      <div className="position-relative">
        {numVisibles > 1 && (
          <button
            className="btn btn-white position-absolute top-50 translate-middle-y"
            style={{ left: 0, zIndex: 10 }}
            onClick={anterior}
          >
            &#10094;
          </button>
        )}
        <div className="d-flex flex-wrap justify-content-center gap-3 px-3">
          {visibles.map(item => (
            <div
              key={item.id}
              className="card shadow-sm"
              style={{
                width:
                  numVisibles === 1
                    ? '100%'
                    : numVisibles === 2
                    ? '47%'
                    : '30%',
                cursor: 'pointer',
                transition: 'transform 0.5s ease-in-out'
              }}
              onClick={() => navegar(`/noticias/details/${item.id}`)}
            >
              <img src={item.imagen} className="img-fija" alt={item.titulo} />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <p className="text-muted small mb-2"><strong>{item.fecha}</strong></p>
                  <h5 className="card-title texto-corto">{item.titulo}</h5>
                  <p className="card-descripcion">{item.descripcion}</p>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3">
                  <img src={item.fotoPerfil} alt={item.nombreExtra} className="img-perfil" />
                  <div className="autor-detalle">
                    <span className="autor-nombre">{item.nombreExtra}</span>
                    <span className="autor-rol">{item.autor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {numVisibles > 1 && (
          <button
            className="btn btn-white position-absolute top-50 translate-middle-y"
            style={{ right: 0, zIndex: 10 }}
            onClick={siguiente}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
}

function DetalleNoticia() {
  const { id } = useParams();
  const noticia = noticias.find(n => n.id === parseInt(id));

  if (!noticia)
    return (
      <div className="container mt-5">
        <p className="text-danger">No encontrado</p>
      </div>
    );

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <style>{`
        .detalle-card {
          max-width: 700px;
          width: 100%;
          background: #fff;
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .detalle-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          object-position: center;
          border-radius: 10px;
          margin-bottom: 1.5rem;
        }
        .card-descripcion {
          text-align: center;
          font-size: 1rem;
          color: #444;
        }
        .btn-back {
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="detalle-card text-center">
        <Link to="/noticias" className="btn btn-outline-success btn-back">← Atrás</Link>
        <h2 className="mb-3">{noticia.titulo}</h2>
        <p className="card-descripcion">{noticia.descripcion}</p>
        <p><strong>{noticia.fecha}</strong></p>
        <p>{noticia.autor}</p>
        <img src={noticia.imagen} alt={noticia.titulo} className="detalle-img" />
        <p><strong>{noticia.contenido}</strong></p>
      </div>
    </div>
  );
}

function AppNoticias() {
  return (
    <Routes>
      <Route path="/" element={<Carrusel />} />
      <Route path="/details/:id" element={<DetalleNoticia />} />
    </Routes>
  );
}

export default AppNoticias;
