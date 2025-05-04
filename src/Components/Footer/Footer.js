import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h3 className="footer-heading">POPULAR LOCATIONS</h3>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">ABOUT US</h3>
          <ul>
            <li>About OLX Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>OLX People</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">OLX</h3>
          <ul>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-country">Other Countries: Pakistan, South Africa, Indonesia</p>
        <p className="footer-rights">© 2006-2021 OLX. All rights reserved.</p>
        <p className="footer-designer">Designed and Developed by Anto Kochumon</p>
      </div>
    </div>
  );
}

export default Footer;
