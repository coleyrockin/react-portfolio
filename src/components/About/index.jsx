import ImgMe from "../../assets/images/MeBGrm.webp";
import Fullstack from "../../assets/images/fullstack.png";
import BaylorBadge from "../../assets/images/baylor-badge.svg";
import RevealItem from "../RevealItem";
import NeuralCanvas from "../NeuralCanvas";

function About() {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const baylorCertificate = `${baseUrl}/certificates/baylor-java-python-certificate.pdf`;

  return (
    <article className="about-panel">
      <div className="about-header-wrap hero-wrap">
        <NeuralCanvas className="neural-bg" />
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="status-pill" aria-label="Availability">
              <span className="status-dot" aria-hidden="true" />
              Available for engineering roles
            </p>
            <h2 className="hero-name">
              Boyd<br />Roberts<span className="hero-name-period">.</span>
            </h2>
            <p className="hero-tagline">
              Full-stack engineer building <em>production-grade software</em> in MERN, Java, and Python.
            </p>
            <p className="hero-meta">
              6 shipped projects &middot; SMU + Baylor trained &middot; Dallas, TX
            </p>
            <div className="hero-cta-row">
              <a className="hero-cta hero-cta--primary" href="#portfolio">
                View work <span aria-hidden="true">→</span>
              </a>
              <a className="hero-cta hero-cta--secondary" href="#contact">
                Get in touch
              </a>
            </div>
          </div>
          <div className="profile-photo-wrap">
            <img className="profile-photo" height={180} width={180} src={ImgMe} alt="Boyd Roberts" fetchPriority="high" decoding="async" />
          </div>
        </div>
      </div>

      <p className="about-text">
        Trained at Southern Methodist University and through Baylor Professional Education&rsquo;s 255-hour Java + Python
        program. My background in customer-facing roles gives me strong instincts for user empathy, clear communication,
        and shipping features that solve real problems.
      </p>

      <div className="about-highlight-grid">
        <RevealItem delay={0}>
          <div className="highlight-item">
            <h3>Core Stack</h3>
            <p>MongoDB, Express, React, Node.js, SQL, REST APIs</p>
          </div>
        </RevealItem>
        <RevealItem delay={1}>
          <div className="highlight-item">
            <h3>Focus</h3>
            <p>Readable code, practical UX, and production-ready features</p>
          </div>
        </RevealItem>
        <RevealItem delay={2}>
          <div className="highlight-item">
            <h3>Current Growth</h3>
            <p>Java, Python, AWS, and broader software engineering depth</p>
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
