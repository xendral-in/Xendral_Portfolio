import "./Team.css";

const TEAM = [
  {
    name: "Vel Murugan V",
    role: "CEO & Founder",
    bio: "Visionary technologist with 10+ years building digital products across AI, cloud, and enterprise software.",
    skills: ["Strategy", "AI/ML", "Leadership"],
    avatar: "VM",
  },
  {
    name: "Soundhara Rajan J",
    role: "Lead Designer",
    bio: "Creative director specializing in UI/UX systems that blend aesthetics with conversion-focused design.",
    skills: ["UI/UX", "Branding", "Figma"],
    avatar: "SJ",
  },
  {
    name: "Gokulan M",
    role: "Frontend Engineer",
    bio: "Senior frontend engineer crafting pixel-perfect React interfaces with smooth animations and responsive design.",
    skills: ["React", "Vite", "CSS"],
    avatar: "GM",
  },
  {
    name: "Bala Narayanan B",
    role: "Digital Marketing Head",
    bio: "Growth strategist driving SEO, paid campaigns, and social media that consistently deliver measurable ROI.",
    skills: ["SEO", "PPC", "Analytics"],
    avatar: "BN",
  },
  {
    name: "Mohana Sundaram B",
    role: "AI & Data Engineer",
    bio: "ML specialist building intelligent automation pipelines and data science solutions for enterprise clients.",
    skills: ["Python", "TensorFlow", "Data"],
    avatar: "MS",
  },
  {
    name: "Seetha Raman S",
    role: "Project Manager",
    bio: "Agile delivery expert ensuring every project ships on time, within scope, and exceeding client expectations.",
    skills: ["Agile", "Scrum", "Client Success"],
    avatar: "SR",
  },
  {
    name: "Praveen V",
    role: "Backend Engineer",
    bio: "Backend specialist building robust REST APIs, database architecture, and server infrastructure that scales under pressure.",
    skills: ["FastAPI", "PostgreSQL", "Docker"],
    avatar: "PV",
  },
  {
    name: "Dharani Priyan S",
    role: "Client Success Manager",
    bio: "Client success leader managing relationships, project briefings, and ensuring every client gets a five-star experience from day one.",
    skills: ["Communication", "CRM", "Onboarding"],
    avatar: "MK",
  },
  {
    name: "Yuva Raj",
    role: "Lead — Client Relations",
    bio: "SDedicated client partner who bridges the gap between our team and yours — managing onboarding, communication, and long-term relationships with precision.",
    skills: ["Client Relations", "Project Briefing", "Retention"],
    avatar: "YR",
  },
];

export default function Team() {
  return (
    <section id="team">
      <div className="team-header reveal">
        <div>
          <div className="s-label">// OUR TEAM</div>
          <h2 className="s-title">The <span className="dim">People</span> Behind Xendral</h2>
          <p className="s-sub">A multidisciplinary team of engineers, designers, and strategists united by one goal — building digital products that perform.</p>
        </div>
      </div>

      <div className="team-grid">
        {TEAM.map((member, i) => (
          <div className="team-card reveal" key={i}>
            <div className="team-card-top">
              <div className="team-avatar">
                <span className="team-avatar-text">{member.avatar}</span>
                <div className="team-avatar-ring"></div>
              </div>
              <div className="team-card-corner"></div>
            </div>
            <div className="team-card-body">
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <p className="team-bio">{member.bio}</p>
              <div className="team-skills">
                {member.skills.map((s, j) => (
                  <span key={j} className="team-skill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
