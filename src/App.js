import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import About from "./components/About";
import Footer from "./components/Footer";
import Portfolio from "./components/Portfolio";
import Resume from "./components/Resume";
import Contact from "./components/Contact";

const sections = [
  { name: "About", slug: "about", comp: About },
  { name: "Portfolio", slug: "portfolio", comp: Portfolio },
  { name: "Contact", slug: "contact", comp: Contact },
  { name: "Knowledge", slug: "knowledge", comp: Resume },
];

function getSectionFromHash(hash) {
  const slug = (hash || "").replace(/^#/, "").toLowerCase();
  return sections.find((section) => section.slug === slug) || null;
}

function App() {
  const [currentSection, setCurrentSection] = useState(() => {
    if (typeof window === "undefined") {
      return sections[0];
    }
    return getSectionFromHash(window.location.hash) || sections[0];
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncFromHash = () => {
      const nextSection = getSectionFromHash(window.location.hash) || sections[0];
      setCurrentSection((previousSection) =>
        previousSection.slug === nextSection.slug ? previousSection : nextSection
      );
    };

    if (!getSectionFromHash(window.location.hash)) {
      window.history.replaceState(null, "", `#${sections[0].slug}`);
    }

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  const handleSectionChange = (section) => {
    if (section.slug === currentSection.slug) {
      return;
    }

    setCurrentSection(section);

    if (typeof window === "undefined") {
      return;
    }

    const nextHash = `#${section.slug}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  };

  return (
    <div className="app-shell">
      <Nav
        sections={sections}
        currentSection={currentSection}
        setCurrentSection={handleSectionChange}
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
