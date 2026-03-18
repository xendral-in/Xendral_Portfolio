import "./ContactBar.css";

export default function ContactBar() {
  return (
    <div className="contact-bar">
      <a href="tel:6380274503" className="cb-item">
        <svg className="cb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>63802 74503</span>
      </a>

      <div className="cb-divider"></div>

      <a href="mailto:xendral.in@gmail.com" className="cb-item">
        <svg className="cb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4AE060" strokeWidth="1.5"/>
          <path d="M2 7l10 7 10-7" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>xendral.in@gmail.com</span>
      </a>

      <div className="cb-divider"></div>

      <a href="https://xendral.in" target="_blank" rel="noreferrer" className="cb-item">
        <svg className="cb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="#4AE060" strokeWidth="1.5"/>
          <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#4AE060" strokeWidth="1.5"/>
          <line x1="3" y1="12" x2="21" y2="12" stroke="#4AE060" strokeWidth="1.5"/>
        </svg>
        <span>xendral.in</span>
      </a>

      <div className="cb-divider"></div>

      <a href="https://maps.google.com/?q=Anna+Nagar+Chennai" target="_blank" rel="noreferrer" className="cb-item">
        <svg className="cb-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#4AE060" strokeWidth="1.5"/>
          <circle cx="12" cy="9" r="2.5" stroke="#4AE060" strokeWidth="1.5"/>
        </svg>
        <span>Anna Nagar, Chennai</span>
      </a>
    </div>
  );
}
