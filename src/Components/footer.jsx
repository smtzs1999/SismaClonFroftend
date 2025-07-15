import icoEmail from '../assets/email.svg'; 
import icoface from '../assets/facebook.svg'; 
import icoInsta from '../assets/instagram.svg'; 
import icoPhone from '../assets/phone.svg';
import icoTwit from '../assets/twitter.svg'; 
import imgDoc from '../img/d1.jpg'
import '../Css/Styles.css';


const Footer = () => {
  return (
    <footer className='footer'>
    <div className='footer-inner'>
      <div className='footer-content'>

        {/* Contact Info */}
        <div className='footer-section'>
          <h2>Contacto</h2>
          <p>
            Para reservar una cita puede llamarnos o usar nuestro formulario en línea disponible en nuestro sitio web. También atendemos emergencias médicas en nuestro consultorio de urgencias 24/7.
          </p>
          <div className='footer-contact'>
            <div >
              <img width="25" height="25" src={icoPhone} alt="phone"/>
              010-070-0170
            </div>
            <div>
              <img width="25" height="25" src={icoEmail} alt="phone"/>
              info@company.com
            </div>
          </div>
        </div>

        {/* Latest News */}
        <div className='footer-section' >
          <h2>Ultimas Noticias</h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px', fontFamily: 'sans-serif',}}>
            <img width="45" height="45" src={imgDoc} alt="news" style={{ borderRadius: '55%', marginRight: '20px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>Tecnologia hermosa</div>
              <div style={{ color: '#888', fontSize: '14px' }}>Marzo 08, 2018</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width="45" height="45" src={imgDoc} alt="news" style={{ borderRadius: '55%', marginRight: '20px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>Nuevo proceso de curación</div>
              <div style={{ color: '#888', fontSize: '14px' }}>Febrero 20, 2018</div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className='footer-section'>
          <h2>Horario </h2>
          <div className='fooer-hours'>
            <div style={{display:'flex'}}>Lunes - Viernes <span style={{ float: 'right' }}> 06:00 AM - 10:00 PM</span></div>
            <div style={{display:'flex'}}>Sabado - <span style={{ float: 'right' }}> 09:00 AM - 08:00 PM</span></div>
            <div style={{display:'flex'}}>Domingo - <span style={{ float: 'right' }}> Cerrado</span></div>
          </div>
          <div className='fooeter-icons'>
            <a href="https://www.facebook.com/share/19AT4aR5PP/">
              <img width="25" height="25" src={icoface} alt="phone" style={{marginRight:'20px'}}/>
            </a>
            <img height="25" src={icoTwit} alt="phone" style={{marginRight:'20px'}} />
            <img width="25" height="25" src={icoInsta} alt="phone"/>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;