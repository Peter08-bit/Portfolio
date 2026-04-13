import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Preloader from "./components/content/Preloader";  // ← import
import Navbar from "./components/navbar/Navbar";
import Cursor from "./components/Cursor";
import Hero from "./components/content/Hero";
import About from "./components/content/About";
import Competence from "./components/content/Competence";
import Projet from "./components/content/Projects";
import Contact from "./components/content/Contact";
import Footer from "./components/content/Footer";
import FloatingContact from "./components/content/FloatingContact";

function App() {
  const [loading, setLoading] = useState(true);  // ← état preloader

  return (
    <Router>
      {/* Preloader — affiché jusqu'à la fin */}
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <div className="relative min-h-screen text-white bg-black overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[600px] h-[600px] bg-green-500/20 blur-[200px] top-[-100px] left-[-100px]" />
          <div className="absolute w-[500px] h-[500px] bg-emerald-400/10 blur-[180px] bottom-[-100px] right-[-100px]" />
        </div>

        <Navbar />
        <Cursor />

        <div className="pt-20">
          <section id="hero">      <Hero />       </section>
          <section id="about">     <About />      </section>
          <section id="competence"><Competence /> </section>
          <section id="projet">    <Projet />     </section>
          <section id="contact">   <Contact />    </section>
          <Footer />
          <FloatingContact />
        </div>
      </div>
    </Router>
  );
}

export default App;