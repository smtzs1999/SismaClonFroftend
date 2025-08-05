import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../App.css';
import CardsApp from '../Cards';
import { OurDoctors } from './OurDoctors';
import { HealthCenter } from './welcome';
import ViewVista from './Citas';
import { useNavigate } from 'react-router-dom';
import Referencias from './Head';
import Preguntas from './Preguntas';

function Home({ onLogout }) { 
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const images = [
    '/src/assets/sistema/carrusel/foto1.jpg',
    '/src/assets/sistema/carrusel/foto2.jpg',
    '/src/assets/sistema/carrusel/foto3.jpg'
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');

    if (onLogout) onLogout(); // logout padre

    navigate('/login');
  }

  return (
    <div className="app">
      <Referencias />
      <header className="app-header">
        <div className="logo">Centro de Salud</div>
        {isMobileView && (
          <button className="hamburger" onClick={() => setMobileMenuOpen(true)}>
            ☰
          </button>
        )}
        {!isMobileView && (
          <nav className="nav desktop-nav">
            <a href="#inicio">Inicio</a>
            <a href="#quienes-somos">Quienes Somos</a>
            <a href="#planes-salud">Planes de salud</a>
            <a href="#contacto">Contacto</a>
          </nav>
        )}
      </header>
      {isMobileView && isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>×</button>
            <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
            <a href="#quienes-somos" onClick={() => setMobileMenuOpen(false)}>Quienes Somos</a>
            <a href="#planes-salud" onClick={() => setMobileMenuOpen(false)}>Planes de salud</a>
            <a href="#contacto" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          </div>
        </div>
      )}
      <main className="hero-section" id="inicio">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={`slide-${idx}`} className="hero-image" />
            </div>
          ))}
        </Carousel>
        <div className="overlay">
          <h1>Sus Beneficios Para la Salud</h1>
          <button className="btn btn-primary active">Ver Más</button>
        </div>
      </main>
      <HealthCenter />
      <OurDoctors />
      <div className="mt-5">
        <CardsApp />
      </div>
      
      <ViewVista />
      
      
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#f3f3f3ff',
          color: 'black',
          border: 'none',
          borderRadius: 5,
          padding: '8px 16px',
          cursor: 'pointer',
          margin: '20px'
        }}
      >
        Cerrar sesiónn
      </button>
    </div>
  );
}

export default Home;
