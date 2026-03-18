import { useState } from "react";
import "./CTA.css";

const BUDGET_OPTIONS = ["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹5L", "₹5L – ₹20L", "₹20L+"];

const SERVICE_OPTIONS = [
  "Website Development","App Development","Digital Marketing",
  "Data Analysis","Custom Software","Video Editing",
  "UI/UX Design","AI Automation","Graphic Designing","Cyber Security",
];

export default function CTA() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [status, setStatus]     = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      errs.name = "Name is required (min 2 chars)";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Valid email is required";
    if (!form.service)
      errs.service = "Please select a service";
    if (!form.message.trim() || form.message.trim().length < 5)
      errs.message = "Please describe your project (min 5 chars)";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation first
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setStatus("loading");

    const payload = {
      name:    form.name.trim(),
      email:   form.email.trim().toLowerCase(),
      company: form.company.trim() || null,
      service: form.service,
      budget:  form.budget || null,
      message: form.message.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
      } else {
        const msg = Array.isArray(data.detail)
          ? data.detail.join(", ")
          : (data.detail || "Submission failed. Please try again.");
        setErrorMsg(msg);
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error — make sure the backend is running on port 8000.");
      setStatus("error");
    }
  }

  return (
    <section id="cta">
      <div className="cta-bg-grid"></div>
      <div className="cta-glow"></div>

      <div className="cta-inner">
        <div className="cta-left reveal">
          <div className="s-label">// GET IN TOUCH</div>
          <h2 className="s-title">
            Start Your <span className="dim">Project</span>
          </h2>
          <p className="cta-desc">
            Ready to transform your business? Tell us about your project and
            we'll get back to you within 24 hours with a tailored proposal.
          </p>

          <div className="cta-info-list">
            <a href="tel:6380274503" className="cta-info-item">
              <span className="cta-info-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <div className="cta-info-label">Phone</div>
                <div className="cta-info-val">63802 74503</div>
              </div>
            </a>
            <a href="https://maps.google.com/?q=Anna+Nagar+Chennai" target="_blank" rel="noreferrer" className="cta-info-item">
              <span className="cta-info-icon">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#4AE060" strokeWidth="1.5"/><circle cx="12" cy="9" r="2.5" stroke="#4AE060" strokeWidth="1.5"/></svg>
              </span>
              <div>
                <div className="cta-info-label">Location</div>
                <div className="cta-info-val">Anna Nagar, Chennai, Tamil Nadu</div>
              </div>
            </a>
            <a href="mailto:xendral.in@gmail.com" className="cta-info-item">
              <span className="cta-info-icon">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#4AE060" strokeWidth="1.5"/><path d="M2 7l10 7 10-7" stroke="#4AE060" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
              <div>
                <div className="cta-info-label">Email</div>
                <div className="cta-info-val">xendral.in@gmail.com</div>
              </div>
            </a>
            <a href="https://xendral.in" target="_blank" rel="noreferrer" className="cta-info-item">
              <span className="cta-info-icon">
                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#4AE060" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke="#4AE060" strokeWidth="1.5"/><line x1="3" y1="12" x2="21" y2="12" stroke="#4AE060" strokeWidth="1.5"/></svg>
              </span>
              <div>
                <div className="cta-info-label">Website</div>
                <div className="cta-info-val">www.xendral.in</div>
              </div>
            </a>
          </div>

          <div className="cta-badges">
            <div className="cta-badge"><span className="badge-dot"></span>Response within 24hrs</div>
            <div className="cta-badge"><span className="badge-dot"></span>Free Consultation</div>
            <div className="cta-badge"><span className="badge-dot"></span>NDA on Request</div>
          </div>
        </div>

        <div className="cta-right reveal">
          <div className="cta-form-card">
            <div className="cta-form-corner"></div>
            <div className="cta-form-header">
              <div className="s-label">// PROJECT BRIEF</div>
              <div className="cta-form-dots"><span></span><span></span><span></span></div>
            </div>

            {status === "success" ? (
              <div className="cta-success">
                <div className="cta-success-icon">✦</div>
                <div className="cta-success-title">Message Received!</div>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button className="btn-g" onClick={() => setStatus("idle")} style={{ marginTop: "24px" }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cta-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                    {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" />
                    {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Company / Brand</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="Your Company" />
                  </div>
                  <div className="form-group">
                    <label>Service Required *</label>
                    <select name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select service...</option>
                      {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {fieldErrors.service && <span className="field-error">{fieldErrors.service}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Budget Range</label>
                  <div className="budget-pills">
                    {BUDGET_OPTIONS.map(b => (
                      <button type="button" key={b}
                        className={`budget-pill${form.budget === b ? " active" : ""}`}
                        onClick={() => setForm(p => ({ ...p, budget: b }))}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Project Details *</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Describe your project, goals, and timeline..." rows={5} />
                  {fieldErrors.message && <span className="field-error">{fieldErrors.message}</span>}
                </div>

                {errorMsg && <div className="form-error">{errorMsg}</div>}

                <button type="submit" className="btn-g form-submit" disabled={status === "loading"}>
                  {status === "loading" ? "Sending..." : "Send Project Brief →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
