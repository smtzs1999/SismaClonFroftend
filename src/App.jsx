import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import { OurDoctors } from './components/OurDoctors';

function App() {
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
    <>
    <div className="app">
      <header className="app-header">
        <div className="logo">Centro de Salud</div>
        <nav className="nav">
          <a href="#">Inicio</a>
          <a href="#">Quienes Somos</a>
          <a href="#">planes de salud</a>
          <a href="#">Contacto</a>
        </nav>
        <button className="cta-button">Acceder a mi cuenta</button>
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
    </div>

        <OurDoctors/>
    </>
  );
}

export default App;
