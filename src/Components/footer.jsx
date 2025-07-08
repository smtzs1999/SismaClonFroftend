import icoEmail from '../assets/email.svg'; 
import icoface from '../assets/facebook.svg'; 
import icoInsta from '../assets/instagram.svg'; 
import icoPhone from '../assets/phone.svg';
import icoTwit from '../assets/twitter.svg'; 
import imgDoc from '../img/d1.jpg'

const Footer = () => {
  return (
    <footer style={{
         background: '#fafafd',
         padding: '48px 0',
         boxSizing: 'border-box',
         fontFamily: 'Arial, sans-serif',
         borderTop: '3px solid #eee'
    }}>
    <div style={{
       padding: '0 32px'
    }}>
        
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '0 auto', }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Contact Info</h2>

          <p style={{ color: '#666', maxWidth: '350px', textAlign:'left'}}>
            Fusce at libero iaculis, venenatis augue quis, 
            pharetra lorem. Curabitur ut dolor eu elit 
            consequat ultricies.
          </p>
          <div style={{ margin: '10px 0', alignItems:'center', gap:'8px', display:'flex' }}>
            <img width="25" height="25" src={icoPhone} alt="phone"/>
            010-070-0170
          </div>
          <div style={{ margin: '10px 0', alignItems:'center', gap:'8px', display:'flex' }}>
            <img width="25" height="25" src={icoEmail} alt="phone"/>
            info@company.com
          </div>
        </div>

        {/* Latest News */}
        <div >
          <h2 style={{ fontWeight: 'bold' }}>Latest News</h2>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '45px' }}>
            <img width="60" height="60" src={imgDoc} alt="news" style={{ borderRadius: '60%', marginRight: '20px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>Amazing Technology</div>
              <div style={{ color: '#888', fontSize: '24px' }}>March 08, 2018</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width="60" height="60" src={imgDoc} alt="news" style={{ borderRadius: '60%', marginRight: '10px' }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>New Healing Process</div>
              <div style={{ color: '#888', fontSize: '14px' }}>February 20, 2018</div>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Opening Hours </h2>
          <div style={{ color: '#666', marginBottom: '50px'}}>
            <div style={{display:'flex'}}>Monday - Friday <span style={{ float: 'right' }}> 06:00 AM - 10:00 PM</span></div>
            <div style={{display:'flex'}}>Saturday - <span style={{ float: 'right' }}> 09:00 AM - 08:00 PM</span></div>
            <div style={{display:'flex'}}>Sunday - <span style={{ float: 'right' }}> Closed</span></div>
          </div>
          <div >
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