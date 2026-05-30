import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav";
import About from "./components/About";
import Footer from "./components/Footer";
import Portfolio from "./components/Portfolio";
import Knowledge from "./components/Knowledge";
import Contact from "./components/Contact";
import ErrorBoundary from "./components/ErrorBoundary";

const sections = [
  { name: "About", slug: "about", comp: About },
  { name: "Portfolio", slug: "portfolio", comp: Portfolio },
  { name: "Knowledge", slug: "knowledge", comp: Knowledge },
  { name: "Contact", slug: "contact", comp: Contact },
];

function getSectionFromHash(hash) {
  const slug = (hash || "").replace(/^#/, "").toLowerCase();
  return sections.find((section) => section.slug === slug) || null;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function App() {
  const mainRef = useRef(null);
  const exitTimeoutRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

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
      const matchedSection = getSectionFromHash(window.location.hash);

      if (matchedSection) {
        setCurrentSection((previousSection) => {
          if (previousSection.slug === matchedSection.slug) return previousSection;
          // Section changed via hash (e.g. in-page CTA, browser back/forward).
          // Move focus to <main> so keyboard/AT users land in the new content,
          // and reset scroll so the new section opens at the top (not mid-scroll
          // from the previous one). Instant — correct for reduced-motion users.
          if (mainRef.current) {
            mainRef.current.focus({ preventScroll: true });
          }
          window.scrollTo(0, 0);
          return matchedSection;
        });
        return;
      }

      if (!window.location.hash || window.location.hash === "#") {
        setCurrentSection((previousSection) =>
          previousSection.slug === sections[0].slug ? previousSection : sections[0]
        );
        window.history.replaceState(null, "", `#${sections[0].slug}`);
      }
    };

    if (!window.location.hash || window.location.hash === "#") {
      window.history.replaceState(null, "", `#${sections[0].slug}`);
    }

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.title = `Boyd Roberts | ${currentSection.name}`;
  }, [currentSection.name]);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  const handleSectionChange = (section) => {
    if (section.slug === currentSection.slug) return;

    if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);

    const commit = () => {
      setCurrentSection(section);
      setIsExiting(false);

      if (mainRef.current) {
        mainRef.current.focus({ preventScroll: true });
      }
      // Open the new section at the top rather than the previous scroll offset.
      window.scrollTo(0, 0);

      const nextHash = `#${section.slug}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
    };

    // Reduced-motion users get no exit animation, so don't make them sit
    // through the 180ms exit window — switch immediately.
    if (prefersReducedMotion()) {
      commit();
      return;
    }

    setIsExiting(true);
    exitTimeoutRef.current = setTimeout(commit, 180);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav
        sections={sections}
        currentSection={currentSection}
        setCurrentSection={handleSectionChange}
      />
      <main className="main-content" id="main-content" tabIndex="-1" ref={mainRef}>
        <section
          className={`content-shell${isExiting ? " content-shell--exiting" : ""}`}
          key={currentSection.slug}
        >
          <ErrorBoundary key={currentSection.slug}>
            <currentSection.comp />
          </ErrorBoundary>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
