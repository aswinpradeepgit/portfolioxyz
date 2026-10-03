import { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";
import FlightPath from "../components/FlightPath";

const HOME_TITLE = "Aswin Pradeep · Backend engineer heading for forward deployed engineering";

export default function Home() {
  const journeyRef = useRef(null);

  useEffect(() => {
    document.title = HOME_TITLE;
  }, []);

  return (
    <div ref={journeyRef} className="relative">
      <FlightPath containerRef={journeyRef} />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
