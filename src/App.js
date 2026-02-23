import React, { useState } from "react";
import Nav from "./components/Nav";
import About from "./components/About";
import Footer from "./components/Footer";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

function App() {
  const sections = [
    { name: "About", comp: About },
    { name: "Portfolio", comp: Portfolio },
    { name: "Contact", comp: Contact },
    { name: "Knowledge", comp: Resume },
  ];

  const [currentSection, setCurrentSection] = useState(sections[0]);

  return (
    <div className="app-shell">
      <Nav
        sections={sections}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <main className="main-content">
        <section className="content-shell">
          {React.createElement(currentSection.comp, {})}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
