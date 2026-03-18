import { useEffect } from "react";
import Navbar from "./components/Navbar";
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
    // Re-query every time to catch dynamically rendered elements
    function attachObserver() {
      const elements = document.querySelectorAll(".reveal:not(.vis)");
      if (!elements.length) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("vis");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
      );

      elements.forEach((el) => obs.observe(el));
      return obs;
    }

    // Run immediately and after a short delay to catch late renders
    const obs1 = attachObserver();
    const timer = setTimeout(() => attachObserver(), 300);

    return () => {
      obs1?.disconnect();
      clearTimeout(timer);
    };
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
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
