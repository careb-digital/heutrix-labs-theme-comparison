import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Services from './components/Services';
import Methodology from './components/Methodology';
import ScrollytellingSection from './components/ScrollytellingSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body-lg text-on-surface antialiased selection:bg-secondary/30 selection:text-primary scroll-smooth">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero />
        <Problem />
        <Services />
        <Methodology />
        <ScrollytellingSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
