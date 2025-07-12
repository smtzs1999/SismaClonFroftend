import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';
import CardsApp from '../Cards';
import { OurDoctors } from './OurDoctors';
import { HealthCenter } from './welcome';
import ViewVista from './Citas';

function Home({ onLogout }) {
  const images = [
    '/src/assets/sistema/carrusel/foto1.jpg',
    '/src/assets/sistema/carrusel/foto2.jpg',
    '/src/assets/sistema/carrusel/foto3.jpg'
  ];

  const [colors, setColors] = useState({
    primary: '#7cc576',
    button: '#8ac53f',
    buttonText: '#fff',
    text: '#000'
  });

  return (
    <div className="app">
      <header className="app-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className="logo">Centro de Salud</div>
        <nav className="nav">
          <a href="#">Inicio</a>
          <a href="#">Quienes Somos</a>
          <a href="#">Planes de salud</a>
          <a href="#">Contacto</a>
        </nav>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            padding: '8px 16px',
            cursor: 'pointer'
          }}
        >
          Cerrar sesión
        </button>
      </header>

      <main className="hero-section">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`slide-${idx}`} className="hero-image" />
            </div>
          ))}
        </Carousel>
        <div className="overlay">
          <h1>Sus Beneficios Para la Salud</h1>
          <button className="read-button">Ver Más</button>
        </div>
      </main>

      <HealthCenter />
      <OurDoctors />
      <CardsApp />
      <ViewVista />
    </div>
  );
}

export default Home;
