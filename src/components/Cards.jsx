import React, { useState } from 'react';
import {BrowserRouter as Router,Routes,Route,useNavigate,useParams,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
  {
    id: 1,
    title: "Urge vencer los miedos para ganarle la batalla al cáncer de próstata en México",
    date: "24 de Enero del 2025",
    author: "• CEO / Clinica SF",
    image: "https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg",
    content: "Doc. Juan Fundador y creador de la clinica SF",
    extra: "Doc. Juan"
  },
  {
    id: 2,
    title: "Aumento de casos de Tos ferina en México",
    date: "26 de Marz0 del 2016",
    author: "• Director General",
    image: "https://media.istockphoto.com/id/1390000431/es/foto/inyecci%C3%B3n-de-un-m%C3%A9dico-maduro-con-una-tableta-digital-en-un-hospital-moderno.jpg?s=612x612&w=0&k=20&c=KFtETXPxOVTPNAWQwRdtD38MsH6xNXJzCSLi2DzMosM=",
    content: "Doc. James Director General de la clinica SF",
    extra: "Doc. James",
  },
  {
    id: 3,
    title: "SE PUBLICÓ EL PROGRAMA NACIONAL DE INFRAESTRUCTURA DE LA CALIDAD 2025",
    date: "25 de Febrero del 2025",
    author: "• Asistente Regional",
    image: "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fHww",
    content: "Doc. Pedro Asistente Regional del consejo",
    extra: "Doc. Pedro"
  },
  {
    id: 4,
    title: "25% de las mujeres sufren afecciones oculares a causa del maquillaje o productos diseñados para la zona ocular",
    date: "27 de Enero del 2025",
    author: "• Asistente Direccion",
    image: "https://media.istockphoto.com/id/1372002650/es/foto/retrato-recortado-de-una-atractiva-joven-doctora-de-pie-con-los-brazos-cruzados-en-la-oficina.jpg?s=612x612&w=0&k=20&c=nyNHWMzJiXcmpJOA5jueMfaFTMKLiSZ2yKMFGvNLrg0=",
    content: "Doc. Teresa Asistente de la Direccion de Medicina",
    extra: "Doc. Teresa"
  },
  {
    id: 5,
    title: "Vacuna contra el Virus Sincicial Respiratorio en México",
    date: "27 de Febrero del 2024",
    author: "• Especialista Ocular",
    image: "https://st3.depositphotos.com/1017187/15617/i/450/depositphotos_156172928-stock-photo-confident-handsome-smiling-doctor-posing.jpg",
    content: "Doc. Francisco Especialista ocular de la clinica SF",
    extra: "Doc. Francisco"
  },
  {
    id: 6,
    title: "Alianza Contra la Muerte Súbita Cardíaca",
    date: "1 de Marzo del 2025",
    author: "• Dentista",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdOcHWXnrpLgMqrlxcUS_Y2DMPSMK5Lg5AkA&s",
    content: "Doc. Juvencio Dentista de la clinica SF",
    extra: "Doc. Juvencio"
  },
];

const Carousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visible = 3;
  const navigate = useNavigate();

  const handleNext = () => {
    if (startIndex < data.length - visible) setStartIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(prev => prev - 1);
  };

  return (
    <div className="container py-2">
      <style>{`
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <h2 className="text-center mb-5">Latest News</h2>
      <div className="position-relative">
        <button
          className="btn btn-dark position-absolute top-50 translate-middle-y z-5"
          onClick={handlePrev}
        >
          &#10094;
        </button>

        <div className="d-flex overflow-hidden px-5 gap-4" style={{ minHeight: '200px' }}>
          {data.slice(startIndex, startIndex + visible).map(card => (
            <div
              key={card.id}
              className="card shadow-sm flex-shrink-0 d-flex flex-column"
              style={{
                width: '24rem',
                minHeight: '400px',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/details/${card.id}`)}
            >
              <img
                src={card.image}
                className="card-img-top"
                alt={card.title}
                style={{
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div
                className="card-body d-flex flex-column justify-content-between"
                style={{ flexGrow: 1, minHeight: '200px' }}
              >
                <div>
                  <p className="text-muted small">{card.date}</p>
                  <h5 className="card-title text-truncate-2">{card.title}</h5>
                </div>
                <p className="card-text mt-2">
                  <small className="text-muted">
                    <strong>{card.extra}</strong>
                  </small>
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y z-5"
          onClick={handleNext}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

const DetailsPage = () => {
  const { id } = useParams();
  const card = data.find(c => c.id === parseInt(id));

  if (!card)
    return (
      <div className="container mt-5">
        <p className="text-danger">Not Found</p>
      </div>
    );

  return (
    <div className="container py-4 text-center">
      <Link to="/" className="btn btn-outline-success mb-3">← Atras</Link>

      <h2>{card.title}</h2>
      <p><strong>{card.date}</strong></p>
      <p>{card.author}</p>
      <img src={card.image} alt={card.title} className="img-fluid my-2" />
      <p><strong>{card.content}</strong></p>
    </div>
  );
};

const CardsApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Carousel />} />
      <Route path="/details/:id" element={<DetailsPage />} />
    </Routes>
  </Router>
);

export default CardsApp;
