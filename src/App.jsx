import { useRef } from "react";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Background from "./components/Background";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";
import Cursor from "./components/Cursor";
import FlightPath from "./components/FlightPath";

function App() {
  const journeyRef = useRef(null);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Background />
      <Cursor />
      <div id="top" className="min-h-screen">
        <Nav />
        <ScrollProgress />
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
      </div>
    </MotionConfig>
  );
}

export default App;
