import { useEffect, useRef } from "react";
import "./CTA.css";

export default function CTA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 45; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        r:     Math.random() * 1.5 + 0.4,
        vx:    (Math.random() - 0.5) * 0.35,
        vy:    (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,224,96,${p.alpha})`;
        ctx.shadowColor = "#4AE060"; ctx.shadowBlur = 6;
        ctx.fill(); ctx.shadowBlur = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const q    = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(74,224,96,${0.1 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="cta">
      <canvas ref={canvasRef} className="cta-canvas"></canvas>
      <div className="cta-bg-grid"></div>

      <div className="cta-inner">

        {/* Headline — matches screenshot exactly */}
        <div className="cta-headline reveal">
          <h2 className="cta-big-title">
            <span className="cta-line-1">Let's Build</span>
            <span className="cta-line-2">Something</span>
            <span className="cta-line-3">Extraordinary</span>
          </h2>
          <p className="cta-sub">
            Ready to transform your vision into a high-performing digital reality?<br />
            Let's start the conversation today.
          </p>
        </div>

        {/* Two buttons side by side */}
        <div className="cta-btn-row reveal">
          <a href="mailto:xendral.in@gmail.com" className="cta-btn-primary">
            Send a Message
          </a>
          <a href="tel:6380274503" className="cta-btn-secondary">
            Call Us Now
          </a>
        </div>

      </div>

      {/* Bottom contact bar — matches screenshot */}
      <div className="cta-bottom-bar">
        <a href="tel:6380274503" className="cta-bottom-item">
          <svg className="cta-bottom-icon" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>63802 74503</span>
        </a>
        <a href="mailto:xendral.in@gmail.com" className="cta-bottom-item">
          <svg className="cta-bottom-icon" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="2" stroke="#4AE060" strokeWidth="1.5"/>
            <path d="M2 7l10 7 10-7" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span>xendral.in@gmail.com</span>
        </a>
        <a href="https://xendral.in" target="_blank" rel="noreferrer" className="cta-bottom-item">
          <svg className="cta-bottom-icon" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#4AE060" strokeWidth="1.5"/>
            <ellipse cx="12" cy="12" rx="4" ry="9" stroke="#4AE060" strokeWidth="1.5"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="#4AE060" strokeWidth="1.5"/>
          </svg>
          <span>xendral.in</span>
        </a>
        <a href="https://maps.google.com/?q=Anna+Nagar+Chennai" target="_blank" rel="noreferrer" className="cta-bottom-item">
          <svg className="cta-bottom-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#4AE060" strokeWidth="1.5"/>
            <circle cx="12" cy="9" r="2.5" stroke="#4AE060" strokeWidth="1.5"/>
          </svg>
          <span>Anna Nagar, Chennai</span>
        </a>
      </div>
    </section>
  );
}
