import { useEffect, useRef } from "react";
import "./About.css";

const METRICS = [
  { val: 50, suffix: "+", label: "Projects Done" },
  { val: 98, suffix: "%", label: "Client Satisfaction" },
  { val: 100, suffix: "%", label: "On-Time Delivery" },
  { val: 10, suffix: "+", label: "Core Services" },
];

const TECHS = ["React","FastAPI","MongoDB","Python","Node.js","PostgreSQL","Docker","AWS","TensorFlow","Redis","GraphQL","TypeScript"];

export default function About() {
  const metricsRef = useRef(null);

  useEffect(() => {
    function animCount(el, target, suffix) {
      let v = 0, dur = 1600, step = 14;
      const inc = target / (dur / step);
      const t = setInterval(() => {
        v = Math.min(v + inc, target);
        el.textContent = Math.floor(v) + suffix;
        if (v >= target) clearInterval(t);
      }, step);
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll(".m-val[data-target]").forEach(el => {
            animCount(el, +el.dataset.target, el.dataset.suffix);
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.3 });
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about">
      <div className="about-left reveal">
        <div className="s-label-1">// <span>WHO WE ARE</span></div>
        <h2 className="s-title">Engineering <span className="dim">Excellence</span></h2>
        <p>Xendral is a Chennai-based digital powerhouse delivering transformative technology solutions. We combine deep engineering expertise with creative strategy to build products that scale.</p>
        <p>From startups to enterprises, we've helped 50+ clients across industries harness the power of AI, cloud, and cutting-edge development practices.</p>

        {/* Animated floating tags */}
        <div className="about-float-tags">
          {["🚀 Fast Delivery", "🔒 Secure Code", "🤖 AI-Powered", "☁️ Cloud Native", "📊 Data Driven"].map((t, i) => (
            <span key={i} className="about-float-tag" style={{ animationDelay: `${i * 0.3}s` }}>{t}</span>
          ))}
        </div>

        <div className="chips">
          {TECHS.map((t, i) => <span key={i} className="chip">{t}</span>)}
        </div>
      </div>
      <div className="about-right reveal">
        <div className="about-card">
          <div className="about-card-corner"></div>
          <div className="s-label">// METRICS</div>
          <div className="metrics-grid" ref={metricsRef}>
            {METRICS.map((m, i) => (
              <div className="metric-cell" key={i}>
                <div className="m-val" data-target={m.val} data-suffix={m.suffix}>0{m.suffix}</div>
                <div className="m-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-tags-box reveal">
          <div className="s-label">// CORE VALUES</div>
          <div className="about-tags">
            {["Innovation First","Speed & Scale","Client-Centric","Secure by Default","Transparent Process"].map((v, i) => (
              <div className="about-tag" key={i}>
                <span className="about-tag-dot"></span>{v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
