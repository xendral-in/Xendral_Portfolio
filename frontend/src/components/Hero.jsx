import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const G = "#4AE060";
    const GA = (a) => `rgba(74,224,96,${a})`;
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    function resize() {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    window.addEventListener("resize", resize);
    resize();

    const LABELS = ["AI/ML","Web Dev","UI/UX","Security","Mobile","Cloud","SEO","Data","DevOps","Brand"];
    const NODE_COUNT = 10;
    const nodes = LABELS.map((label, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2 - Math.PI / 2;
      const baseR = 155;
      const jitter = (Math.random() - 0.5) * 60;
      return {
        x: W() / 2 + Math.cos(angle) * (baseR + jitter),
        y: H() / 2 + Math.sin(angle) * (baseR + jitter) * 0.75,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 7 + Math.random() * 4,
        label, pulse: Math.random() * Math.PI * 2,
        alpha: 0.7 + Math.random() * 0.3,
      };
    });
    nodes.push({ x: W() / 2, y: H() / 2, vx: 0, vy: 0, r: 14, label: "XENDRAL", pulse: 0, alpha: 1, centre: true });

    const packets = [];
    function spawnPacket(a, b) { packets.push({ from: a, to: b, t: 0, speed: 0.008 + Math.random() * 0.006 }); }
    for (let i = 0; i < 6; i++) spawnPacket(Math.floor(Math.random() * 10), nodes[nodes.length - 1]);

    let scanY = 0, t = 0;
    const COLS = 14;
    const rainCols = Array.from({ length: COLS }, (_, i) => ({
      x: (i + 0.5) * (420 / COLS), y: Math.random() * 400,
      speed: 0.4 + Math.random() * 0.6,
      chars: Array.from({ length: 8 }, () => Math.random() < 0.5 ? "1" : "0"),
      timer: 0,
    }));

    function drawEdge(a, b) {
      const dx = b.x - a.x, dy = b.y - a.y, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 280) return;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = GA((1 - dist / 280) * 0.25); ctx.lineWidth = 0.6; ctx.stroke();
    }

    function drawNode(n) {
      const pulse = Math.sin(t * 0.04 + n.pulse), glowR = n.r + 4 + pulse * 3;
      ctx.beginPath(); ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
      ctx.strokeStyle = GA(0.12 + pulse * 0.08); ctx.lineWidth = 1; ctx.stroke();
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      grad.addColorStop(0, n.centre ? "rgba(74,224,96,0.6)" : "rgba(74,224,96,0.25)");
      grad.addColorStop(1, n.centre ? "rgba(74,224,96,0.15)" : "rgba(74,224,96,0.04)");
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = GA(n.alpha * 0.6); ctx.lineWidth = n.centre ? 1.5 : 1; ctx.stroke();
      ctx.font = `${n.centre ? 7 : 6.5}px 'Space Mono',monospace`;
      ctx.fillStyle = GA(0.55); ctx.textAlign = "center";
      ctx.fillText(n.centre ? "✦ CORE" : n.label, n.x, n.y + n.r + 11);
    }

    function drawPacket(pk) {
      const a = nodes[pk.from], b = pk.to;
      if (!a || !b) return;
      const x = a.x + (b.x - a.x) * pk.t, y = a.y + (b.y - a.y) * pk.t;
      for (let i = 1; i <= 5; i++) {
        const tf = Math.max(0, pk.t - i * 0.02);
        ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * tf, a.y + (b.y - a.y) * tf, 1.5 * (1 - i / 6), 0, Math.PI * 2);
        ctx.fillStyle = GA((1 - i / 6) * 0.4); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = G; ctx.shadowColor = G; ctx.shadowBlur = 10; ctx.fill(); ctx.shadowBlur = 0;
      pk.t += pk.speed;
    }

    function drawRain() {
      rainCols.forEach(col => {
        col.timer++;
        if (col.timer > 18) { col.chars.push(Math.random() < 0.5 ? "1" : "0"); col.chars.shift(); col.timer = 0; }
        col.y += col.speed; if (col.y > H() + 120) col.y = -80;
        col.chars.forEach((ch, i) => {
          ctx.font = `${i === col.chars.length - 1 ? 9 : 8}px 'Space Mono',monospace`;
          ctx.fillStyle = GA((i / col.chars.length) * 0.18); ctx.textAlign = "left";
          ctx.fillText(ch, col.x, col.y - (col.chars.length - 1 - i) * 13);
        });
      });
    }

    function drawScan() {
      const h = H(); if (!h || !isFinite(h)) return;
      scanY = (scanY + 0.6) % h;
      const g = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 2);
      g.addColorStop(0, "rgba(74,224,96,0)"); g.addColorStop(1, "rgba(74,224,96,0.04)");
      ctx.fillStyle = g; ctx.fillRect(0, scanY - 30, W(), 32);
    }

    let animId;
    function draw() {
      ctx.clearRect(0, 0, W(), H());
      drawRain(); drawScan();
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) drawEdge(nodes[i], nodes[j]);
      for (let i = packets.length - 1; i >= 0; i--) {
        drawPacket(packets[i]);
        if (packets[i].t >= 1) {
          packets.splice(i, 1);
          const next = Math.floor(Math.random() * 10), centre = nodes.length - 1;
          Math.random() < 0.5 ? spawnPacket(centre, nodes[next]) : spawnPacket(next, centre);
        }
      }
      while (packets.length < 5) spawnPacket(Math.floor(Math.random() * 10), nodes[nodes.length - 1]);
      nodes.forEach(n => {
        if (n.centre) { n.x = W() / 2; n.y = H() / 2; return; }
        n.x += n.vx; n.y += n.vy;
        const pad = 40;
        if (n.x < pad || n.x > W() - pad) n.vx *= -1;
        if (n.y < pad || n.y > H() - pad) n.vy *= -1;
      });
      nodes.forEach(drawNode);
      t++;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section id="hero">
      <div className="hero-grid-bg"></div>
      <div className="hero-inner">
        <div className="hero-badge">
          <div className="badge-scanner">
            <div className="scanner-ring scanner-ring-1"></div>
            <div className="scanner-ring scanner-ring-2"></div>
            <div className="scanner-ring scanner-ring-3"></div>
            <div className="scanner-core"></div>
          </div>
          <div className="badge-text-group">
            <span className="badge-label">System</span>
            <span className="badge-status">ONLINE</span>
          </div>
          <div className="badge-separator"></div>
          <div className="badge-text-group">
            <span className="badge-label">Location</span>
            <span className="badge-status">Chennai, IND</span>
          </div>
          <div className="badge-separator"></div>
          <div className="badge-text-group">
            <span className="badge-label">Uptime</span>
            <span className="badge-status badge-status--green">98.9%</span>
          </div>
        </div>
        <h1 className="hero-h1">
          <span className="l1">Transforming Businesses</span>
          <span className="l2">WITH</span>
          <span className="l3">INTELLIGENT</span>
          <span className="l4">AUTOMATION</span>
        </h1>
        <p className="hero-p">We bridge the gap between complex technology and business success. Drive digital transformation with bespoke strategies designed for scale, security, and speed.</p>
        <div className="hero-btns">
          <a href="#cta" className="btn-g">Start Your Project</a>
          <a href="#services" className="btn-o">Explore Services</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><div className="stat-n">10<em>+</em></div><div className="stat-l">Core Services</div></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><div className="stat-n">10<em>+</em></div><div className="stat-l">Projects Done</div></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><div className="stat-n">98<em>%</em></div><div className="stat-l">Satisfaction</div></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><div className="stat-n">24<em>/</em>7</div><div className="stat-l">Support</div></div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-glow"></div>
        <div className="hero-ring"></div>
        <canvas ref={canvasRef} id="techCanvas"></canvas>

        <div className="code-card code-card-1">
          <div><span className="kw">const</span> <span className="fn">buildFuture</span> = <span className="kw">async</span> () =&gt; {"{"}</div>
          <div>&nbsp;&nbsp;<span className="kw">await</span> <span className="fn">ai</span>.<span className="fn">deploy</span>(<span className="str">'prod'</span>);</div>
          <div>&nbsp;&nbsp;<span className="kw">return</span> <span className="str">'success'</span>;</div>
          <div>{"}"}</div>
          <div className="cm">// v2.4.1 — live</div>
          <div><span className="cursor"></span></div>
        </div>

        <div className="code-card code-card-2">
          <div><span className="kw">@app</span>.<span className="fn">post</span>(<span className="str">"/api/transform"</span>)</div>
          <div><span className="kw">async def</span> <span className="fn">transform</span>(data: <span className="fn">Schema</span>):</div>
          <div>&nbsp;&nbsp;<span className="kw">return</span> <span className="fn">ai_engine</span>.<span className="fn">run</span>(data)</div>
          <div className="cm"># FastAPI · MongoDB</div>
        </div>

        <div className="code-card code-card-3">
          <div>db.<span className="fn">solutions</span>.<span className="fn">insertOne</span>({"{"}</div>
          <div>&nbsp;&nbsp;<span className="str">client</span>: <span className="str">"Xendral"</span>,</div>
          <div>&nbsp;&nbsp;<span className="str">result</span>: <span className="str">"∞ ROI"</span></div>
          <div>{"}"});</div>
        </div>

        <div className="stat-pill pill-1"><div className="dot"></div>SYSTEM ONLINE</div>
        <div className="stat-pill pill-2"><div className="dot"></div>98.9% UPTIME</div>
        <div className="stat-pill pill-3"><div className="dot"></div>AI ACTIVE</div>
      </div>
    </section>
  );
}
