import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import About from './components/About';
import Footer from './components/Footer'
import Portfolio from './components/Portfolio';
import Resume from "./components/Resume";
import ContactForm from './components/Contact';


function App() {
  const sections = [
    { name: "About", comp: About },
    { name: "Portfolio", comp: Portfolio },
    { name: "Contact", comp: ContactForm },
    { name: "Resume", comp: Resume }

  ];

  const [currentSection, setCurrentSection] = useState(sections[0]);
  return (
    <div class="flex-row p-1">
      <Nav
        sections={sections}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <main className="flex justify-center">
        <section className="p-3">
          {React.createElement(currentSection.comp, {})}
        </section>
      </main>
      <Footer />
    </div>

  );
}



export default App;
