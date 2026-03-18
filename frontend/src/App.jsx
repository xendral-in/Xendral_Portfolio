import { useEffect } from "react";
import Navbar from "./components/Navbar";
import ContactBar from "./components/ContactBar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Services from "./components/Services";
import About from "./components/About";
import Process from "./components/Process";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import "./styles/globals.css";
import "./styles/animations.css";

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("vis"), i * 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <ContactBar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
