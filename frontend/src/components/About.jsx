import { useEffect, useRef } from "react";
import "./About.css";

const METRICS = [
  { val: 10,  suffix: "+",      label: "Projects Delivered" },
  { val: 98,  suffix: "%",      label: "Satisfaction Rate"  },
  { val: 10,  suffix: "+",      label: "Service Verticals"  },
  { val: null, display: "24/7", label: "Client Support"     },
];

const CHIPS = [
  "Full-Stack Dev", "AI / ML", "UX Research",
  "Brand Strategy", "Cloud & Security",
  "Agile Delivery", "Mobile Apps", "Data Science",
];

export default function About() {
  const metricsRef = useRef(null);

  useEffect(() => {
    function animCount(el, target, suffix) {
      let v = 0;
      const inc = target / (1600 / 14);
      const interval = setInterval(() => {
        v = Math.min(v + inc, target);
        el.textContent = Math.floor(v) + suffix;
        if (v >= target) clearInterval(interval);
      }, 14);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.querySelectorAll(".m-val[data-target]").forEach((el) =>
              animCount(el, +el.dataset.target, el.dataset.suffix)
            );
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about">

      {/* ── LEFT ── */}
      <div className="about-left">
        <div className="s-label-1">// <span>ABOUT XENDRAL</span></div>
        <h2 className="about-title">
          <span className="about-title-white">Engineering</span>
          <span className="about-title-dim">The Future</span>
        </h2>

        <p className="about-p">
          Xendral is a full-service digital agency based in Anna Nagar, built to bridge
          the gap between complex technology and real business outcomes. We transform
          ambitious ideas into high-performing digital realities.
        </p>
        <p className="about-p">
          Our multidisciplinary team of engineers, designers, and strategists delivers
          10 core service disciplines under one roof — with a commitment to quality that
          has earned us a 98% client satisfaction rate.
        </p>
        <p className="about-p">
          From startups to enterprises, we design, build, and scale digital products
          that truly perform.
        </p>

        <div className="about-chips">
          {CHIPS.map((c, i) => (
            <span key={i} className="about-chip">{c}</span>
          ))}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="about-right">
        <div className="about-card">
          <div className="about-card-corner"></div>
          <div className="s-label">// PERFORMANCE METRICS</div>
          <div className="metrics-grid" ref={metricsRef}>
            {METRICS.map((m, i) => (
              <div className="metric-cell" key={i}>
                {m.display
                  ? <div className="m-val">{m.display}</div>
                  : <div className="m-val" data-target={m.val} data-suffix={m.suffix}>0{m.suffix}</div>
                }
                <div className="m-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
