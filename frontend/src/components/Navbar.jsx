import { LOGO_ICON, LOGO_WORDMARK } from "../assets_b64.js";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#hero" className="logo-wrap">
        <img src={LOGO_ICON} alt="Xendral Icon" className="logo-icon-img" />
        <img src={LOGO_WORDMARK} alt="Xendral" className="logo-wordmark-img" />
      </a>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="#cta">Contact</a></li>
      </ul>
      <a href="#cta" className="nav-btn">Start Project</a>
    </nav>
  );
}
