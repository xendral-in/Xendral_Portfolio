import "./Process.css";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We deep-dive into your business goals, audience, and competitive landscape to craft a precise digital roadmap.",
    tags: ["Research", "Audit", "Roadmap"],
  },
  {
    num: "02",
    title: "Architecture & Design",
    desc: "System architecture, UI/UX wireframes, and design systems built for scalability and brand consistency.",
    tags: ["System Design", "Wireframes", "UI Kit"],
  },
  {
    num: "03",
    title: "Engineering & Build",
    desc: "Full-stack development with React, FastAPI, and MongoDB. Agile sprints with weekly demos and transparent progress.",
    tags: ["React", "FastAPI", "MongoDB"],
  },
  {
    num: "04",
    title: "QA & Security",
    desc: "Rigorous testing pipelines, penetration testing, and performance audits to guarantee production-grade quality.",
    tags: ["Testing", "Security", "Performance"],
  },
  {
    num: "05",
    title: "Deploy & Scale",
    desc: "CI/CD pipelines, cloud deployment, monitoring dashboards, and 24/7 SLA-backed support.",
    tags: ["CI/CD", "Cloud", "Monitoring"],
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="process-header reveal">
        <div>
          <div className="s-label">// HOW WE WORK</div>
          <h2 className="s-title">
            Our <span className="dim">Process</span>
          </h2>
        </div>
        <p className="s-sub">
          A battle-tested 5-step framework that transforms ideas into
          production-ready digital products — on time, every time.
        </p>
      </div>

      <div className="process-steps">
        {STEPS.map((step, i) => (
          <div className="process-step reveal" key={i}>
            <div className="ps-num-col">
              <div className="ps-num">{step.num}</div>
              {i < STEPS.length - 1 && <div className="ps-line"></div>}
            </div>
            <div className="ps-content">
              <div className="ps-title">{step.title}</div>
              <div className="ps-desc">{step.desc}</div>
              <div className="ps-tags">
                {step.tags.map((tag, j) => (
                  <span className="ps-tag" key={j}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="ps-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}
