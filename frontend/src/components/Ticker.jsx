import "./Ticker.css";

const items = [
  "AI & Machine Learning", "Web Development", "Mobile Apps", "UI/UX Design",
  "Cloud Infrastructure", "Cybersecurity", "SEO & Growth", "Brand Identity",
  "Data Analytics", "DevOps",
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            <span className="ticker-sep"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  );
}
