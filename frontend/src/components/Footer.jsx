import { LOGO_ICON, LOGO_WORDMARK } from "../assets_b64.js";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#hero" className="logo-wrap">
            <img src={LOGO_ICON} alt="Xendral Icon" className="logo-icon-img" />
            <img src={LOGO_WORDMARK} alt="Xendral" className="logo-wordmark-img" />
          </a>
          <p className="footer-tagline">
            Transforming businesses through intelligent automation, cutting-edge development, and data-driven strategy.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <ul>
              <li><a href="#services">Website Development</a></li>
              <li><a href="#services">App Development</a></li>
              <li><a href="#services">Digital Marketing</a></li>
              <li><a href="#services">AI Automation</a></li>
              <li><a href="#services">Cyber Security</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#cta">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Connect</div>
            <ul>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter / X</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="mailto:xendral.in@gmail.com">xendral.in@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="f-copy">© 2026 Xendral. All rights reserved.</p>
        <div className="footer-status">
          <span className="footer-dot"></span>
          <span>All systems operational</span>
        </div>
      </div>
    </footer>
  );
}
