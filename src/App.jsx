import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./components/content/Preloader";
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
  const [loading, setLoading] = useState(true);

  const handlePreloaderFinish = () => {
    setLoading(false);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  return (
    <Router>
      {/* Preloader */}
      {loading && <Preloader onFinish={handlePreloaderFinish} />}

      <div className="relative min-h-screen text-slate-900 bg-[#f8fafc] selection:bg-emerald-500/20 selection:text-emerald-800 overflow-x-hidden font-sans">
        {/* Ambiance d'arrière-plan claire et épurée */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          {/* Halo supérieur doux émeraude */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-emerald-500/[0.07] via-teal-500/[0.04] to-transparent blur-[140px] rounded-full" />
          
          {/* Halo médian subtil */}
          <div className="absolute top-[40%] -left-48 w-[500px] h-[500px] bg-emerald-500/[0.03] blur-[160px] rounded-full" />
          
          {/* Halo inférieur discret */}
          <div className="absolute bottom-[-100px] -right-48 w-[600px] h-[600px] bg-teal-500/[0.03] blur-[160px] rounded-full" />

          {/* Grille texturée ultra-fine */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.4) 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <Navbar />
        <Cursor />

        <main className="relative z-10 flex flex-col gap-24 md:gap-32 pt-20">
          <section id="hero">      <Hero />       </section>
          <section id="about">     <About />      </section>
          <section id="competence"><Competence /> </section>
          <section id="projet">    <Projet />     </section>
          <section id="contact">   <Contact />    </section>
        </main>

        <Footer />
        <FloatingContact />
      </div>
    </Router>
  );
}

export default App;