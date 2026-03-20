import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import Team from "./components/Team";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import "./styles/globals.css";
import "./styles/animations.css";

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Process />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
