import { useEffect, useState } from "react";
import "./Services.css";

const ICONS = {
  globe: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <circle cx="25" cy="25" r="18" stroke="#4AE060" strokeWidth="1.5"/>
      <ellipse cx="25" cy="25" rx="9" ry="18" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="7" y1="25" x2="43" y2="25" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="9" y1="16" x2="41" y2="16" stroke="#4AE060" strokeWidth="1" strokeDasharray="2 2"/>
      <line x1="9" y1="34" x2="41" y2="34" stroke="#4AE060" strokeWidth="1" strokeDasharray="2 2"/>
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="12s" repeatCount="indefinite"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <rect x="14" y="6" width="22" height="38" rx="3" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="14" y1="12" x2="36" y2="12" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="14" y1="38" x2="36" y2="38" stroke="#4AE060" strokeWidth="1.5"/>
      <circle cx="25" cy="43" r="1.5" fill="#4AE060"/>
      <rect x="19" y="8.5" width="12" height="1.5" rx="1" fill="#4AE060" opacity="0.5"/>
      <rect x="18" y="17" width="14" height="2" rx="1" fill="#4AE060" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
      </rect>
      <rect x="18" y="22" width="10" height="2" rx="1" fill="#4AE060" opacity="0.2">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.5s" repeatCount="indefinite"/>
      </rect>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <polyline points="8,38 18,24 27,30 38,12" stroke="#4AE060" strokeWidth="2" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="0">
        <animate attributeName="stroke-dashoffset" values="60;0;0" dur="2.5s" repeatCount="indefinite"/>
      </polyline>
      <circle cx="38" cy="12" r="2.5" fill="#4AE060">
        <animate attributeName="r" values="2.5;4;2.5" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <line x1="8" y1="38" x2="44" y2="38" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="8" y1="8" x2="8" y2="38" stroke="#4AE060" strokeWidth="1.5"/>
    </svg>
  ),
  bars: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <rect x="8" y="28" width="8" height="14" fill="#4AE060" opacity="0.4">
        <animate attributeName="height" values="14;20;14" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="y" values="28;22;28" dur="2s" repeatCount="indefinite"/>
      </rect>
      <rect x="21" y="18" width="8" height="24" fill="#4AE060" opacity="0.65">
        <animate attributeName="height" values="24;30;24" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="y" values="18;12;18" dur="1.8s" repeatCount="indefinite"/>
      </rect>
      <rect x="34" y="10" width="8" height="32" fill="#4AE060">
        <animate attributeName="height" values="32;26;32" dur="2.2s" repeatCount="indefinite"/>
        <animate attributeName="y" values="10;16;10" dur="2.2s" repeatCount="indefinite"/>
      </rect>
      <line x1="6" y1="42" x2="44" y2="42" stroke="#4AE060" strokeWidth="1.5"/>
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <circle cx="25" cy="25" r="7" stroke="#4AE060" strokeWidth="1.5"/>
      <path d="M25 8v5M25 37v5M8 25h5M37 25h5M12.9 12.9l3.5 3.5M33.6 33.6l3.5 3.5M12.9 37.1l3.5-3.5M33.6 16.4l3.5-3.5" stroke="#4AE060" strokeWidth="1.8" strokeLinecap="round"/>
      <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="8s" repeatCount="indefinite"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <rect x="6" y="14" width="28" height="20" rx="2" stroke="#4AE060" strokeWidth="1.5"/>
      <polygon points="34,22 44,17 44,33 34,28" stroke="#4AE060" strokeWidth="1.5" fill="rgba(74,224,96,0.1)"/>
      <circle cx="13" cy="40" r="2" fill="#4AE060">
        <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <line x1="18" y1="40" x2="36" y2="40" stroke="#4AE060" strokeWidth="1" opacity="0.35"/>
    </svg>
  ),
  uiux: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <rect x="6" y="10" width="38" height="26" rx="2" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="6" y1="17" x2="44" y2="17" stroke="#4AE060" strokeWidth="1"/>
      <circle cx="10" cy="13.5" r="1.5" fill="#4AE060" opacity="0.5"/>
      <circle cx="15" cy="13.5" r="1.5" fill="#4AE060" opacity="0.5"/>
      <circle cx="20" cy="13.5" r="1.5" fill="#4AE060" opacity="0.5"/>
      <rect x="11" y="22" width="12" height="8" rx="1" stroke="#4AE060" strokeWidth="1" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
      </rect>
      <rect x="27" y="22" width="12" height="3" rx="1" fill="#4AE060" opacity="0.3"/>
      <rect x="27" y="27" width="8" height="3" rx="1" fill="#4AE060" opacity="0.2"/>
      <line x1="20" y1="36" x2="30" y2="36" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="25" y1="36" x2="25" y2="40" stroke="#4AE060" strokeWidth="1.5"/>
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <rect x="12" y="18" width="26" height="22" rx="3" stroke="#4AE060" strokeWidth="1.5"/>
      <rect x="18" y="10" width="14" height="8" rx="2" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="25" y1="10" x2="25" y2="8" stroke="#4AE060" strokeWidth="1.5"/>
      <circle cx="25" cy="7" r="2" fill="#4AE060">
        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="20" cy="28" r="3" stroke="#4AE060" strokeWidth="1.5">
        <animate attributeName="stroke-opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="30" cy="28" r="3" stroke="#4AE060" strokeWidth="1.5">
        <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <line x1="17" y1="35" x2="33" y2="35" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="27" x2="6" y2="27" stroke="#4AE060" strokeWidth="1.5"/>
      <line x1="38" y1="27" x2="44" y2="27" stroke="#4AE060" strokeWidth="1.5"/>
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <path d="M25 8C16 8 9 15 9 24c0 5.5 2.7 10.3 7 13.3 1 .7 2.2.7 3.1 0l1.5-1.1c.6-.5 1.4-.5 2 0l3 2.1c2.2 1.5 5.1.2 5.4-2.3.2-1.7 1.8-3 3.5-3 5.8 0 10.5-4.7 10.5-10.5C45 12.7 36 8 25 8z" stroke="#4AE060" strokeWidth="1.5"/>
      <circle cx="16" cy="22" r="2.5" fill="#4AE060" opacity="0.7"/>
      <circle cx="24" cy="16" r="2.5" fill="#4AE060" opacity="0.5">
        <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="33" cy="20" r="2.5" fill="#4AE060" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite"/>
      </circle>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg-icon">
      <path d="M25 7L10 13v12c0 9 6.5 17.4 15 19 8.5-1.6 15-10 15-19V13L25 7z" stroke="#4AE060" strokeWidth="1.5" fill="rgba(74,224,96,0.05)"/>
      <path d="M18 25l5 5 9-10" stroke="#4AE060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" strokeDashoffset="20">
        <animate attributeName="stroke-dashoffset" values="20;0;0;20" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M25 7L10 13v12c0 9 6.5 17.4 15 19 8.5-1.6 15-10 15-19V13L25 7z" stroke="#4AE060" strokeWidth="0.5" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  ),
};

const SERVICES = [
  {
    num: "01", iconKey: "globe",
    name: ["Website ", <span key="g" className="g">Development</span>],
    desc: "Fast, secure and scalable websites built with modern frameworks for maximum performance and user experience.",
  },
  {
    num: "02", iconKey: "mobile",
    name: ["App ", <span key="g" className="g">Development</span>],
    desc: "Native and cross-platform mobile apps delivering seamless experiences on both iOS and Android platforms.",
  },
  {
    num: "03", iconKey: "chart",
    name: ["Digital ", <span key="g" className="g">Marketing</span>],
    desc: "Data-driven campaigns covering SEO, social media, PPC, and content marketing to grow your brand online.",
  },
  {
    num: "04", iconKey: "bars",
    name: ["Data ", <span key="g" className="g">Analysis</span>],
    desc: "Transform raw data into actionable insights with advanced analytics, dashboards, and intelligent reporting.",
  },
  {
    num: "05", iconKey: "gear",
    name: ["Custom ", <span key="g" className="g">Software</span>],
    desc: "Bespoke software solutions architected precisely to your requirements and built to scale with your business.",
  },
  {
    num: "06", iconKey: "video",
    name: ["Video ", <span key="g" className="g">Editing</span>],
    desc: "Professional video production and post-production for ads, reels, corporate films, and social media content.",
  },
  {
    num: "07", iconKey: "uiux",
    name: ["UI/UX ", <span key="g" className="g">Design</span>],
    desc: "Intuitive and striking interfaces – mobile UI, wireframes, prototypes, and complete user experience systems.",
  },
  {
    num: "08", iconKey: "robot",
    name: ["AI ", <span key="g" className="g">Automation</span>],
    desc: "Intelligent automation that eliminates repetitive work and accelerates business operations at any scale.",
  },
  {
    num: "09", iconKey: "palette",
    name: ["Graphic ", <span key="g" className="g">Designing</span>],
    desc: "Bold visual identities, brand collateral, social creatives, and marketing materials built to make an impact.",
  },
  {
    num: "10", iconKey: "shield",
    name: ["Cyber ", <span key="g" className="g">Security</span>],
    desc: "End-to-end security audits, threat protection, and compliance to keep your digital assets completely safe.",
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="services-header reveal">
        <div>
          <div className="s-label">// WHAT WE DO</div>
          <h2 className="s-title">Our <span className="dim">Services</span></h2>
          <p className="s-sub">End-to-end digital solutions engineered for impact.</p>
        </div>
        <a href="#cta" className="btn-o">All Services →</a>
      </div>
      <div className="grid-wrap">
        <div className="services-unified-grid">
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }) {
  return (
    <div className="svc-card reveal">
      <div className="svc-num">{s.num}</div>
      <div className="svc-icon svc-icon-3d">
        {ICONS[s.iconKey]}
      </div>
      <div className="svc-name">{s.name}</div>
      <div className="svc-desc">{s.desc}</div>
      <a href="#cta" className="svc-link">Explore →</a>
    </div>
  );
}
