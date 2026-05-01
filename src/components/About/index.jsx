import ImgMe from "../../assets/images/headshot.webp";
import Fullstack from "../../assets/images/fullstack.png";
import BaylorBadge from "../../assets/images/baylor-badge.svg";
import { projects } from "../../data/projects";
import RevealItem from "../RevealItem";

function About() {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const baylorCertificate = `${baseUrl}/certificates/baylor-java-python-certificate.pdf`;

  return (
    <article className="about-panel">
      <div className="about-header-wrap">
        <p className="hero-kicker">Software Engineer</p>
        <div className="hero-grid">
          <div className="profile-photo-wrap">
            <img className="profile-photo" src={ImgMe} alt="Boyd Roberts" fetchPriority="high" decoding="async" width={720} height={1045} />
          </div>
          <div className="hero-copy">
            <h2 className="hero-name">Boyd Roberts.</h2>
            <p className="hero-tagline">I build production-grade web products with React, TypeScript, Node.js, Java, and Python.</p>
            <p className="hero-meta">{projects.length} shipped projects • Dallas, TX • Open to engineering roles</p>
            <div className="hero-cta-row">
              <a className="hero-cta hero-cta--primary" href="#portfolio">
                View work
              </a>
              <a className="hero-cta hero-cta--secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="about-text">
        Trained at Southern Methodist University and Baylor Professional Education&rsquo;s 255-hour Java + Python program.
        I focus on clean architecture, readable code, and shipping practical features that hold up in production.
      </p>

      <div className="about-highlight-grid">
        <RevealItem delay={0}>
          <div className="highlight-item">
            <h3>Core Stack</h3>
            <p>React, Next.js, Node.js, TypeScript, Java, Python</p>
          </div>
        </RevealItem>
        <RevealItem delay={1}>
          <div className="highlight-item">
            <h3>Focus</h3>
            <p>Production-ready systems, practical UX, and maintainable implementation</p>
          </div>
        </RevealItem>
        <RevealItem delay={2}>
          <div className="highlight-item">
            <h3>GitHub</h3>
            <p>Public build history and real project code at github.com/coleyrockin</p>
          </div>
        </RevealItem>
      </div>

      <div className="cert-link-row">
        <a
          className="cta-link"
          href="https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          View SMU Developer Credential
        </a>
        <a
          className="cta-link"
          href={baylorCertificate}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Baylor Java + Python Certificate
        </a>
      </div>

      <RevealItem delay={0}>
        <div className="badge-wrap">
          <a href="https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url" target="_blank" rel="noopener noreferrer">
            <img src={Fullstack} alt="Southern Methodist University Full Stack Web Development credential badge" loading="lazy" decoding="async" />
          </a>
          <a href={baylorCertificate} target="_blank" rel="noopener noreferrer">
            <img src={BaylorBadge} alt="Baylor University Professional Education certificate" className="baylor-badge" loading="lazy" decoding="async" />
          </a>
        </div>
      </RevealItem>
    </article>
  );
}

export default About;
