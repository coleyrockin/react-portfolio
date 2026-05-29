import Fullstack from "../../assets/images/fullstack.webp";
import BaylorBadge from "../../assets/images/baylor-badge.svg";
import { projects } from "../../data/projects";
import RevealItem from "../RevealItem";
import { SiReact, SiNextdotjs, SiNodedotjs } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import { FaMapMarkerAlt } from "react-icons/fa";

const heroStack = [
  { key: "react", label: "React", Icon: SiReact },
  { key: "next", label: "Next.js", Icon: SiNextdotjs },
  { key: "node", label: "Node.js", Icon: SiNodedotjs },
  { key: "ai", label: "AI workflows", Icon: HiSparkles },
];

function About() {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const baylorCertificate = `${baseUrl}/certificates/baylor-java-python-certificate.pdf`;
  // Headshot is the LCP element. Served full-res (720x1046, the highest-quality
  // master in the repo) as a single source so every display gets the crispest
  // image — no downscaled srcSet variant. Stable public URL so index.html can
  // preload it; the href there MUST match this one or the browser double-fetches.
  const headshot = `${baseUrl}/images/headshot.webp`;
  const proofItems = [`${projects.length} public builds`, "CI + CodeQL", "Live demos"];

  return (
    <article className="about-panel">
      <p className="section-eyebrow">Introduction</p>
      <div className="about-header-wrap">
        <p className="hero-kicker">Software Engineer</p>
        <div className="hero-grid">
          <div className="profile-photo-wrap">
            <img
              className="profile-photo"
              src={headshot}
              alt="Boyd Roberts"
              fetchPriority="high"
              decoding="async"
              width={720}
              height={1046}
            />
          </div>
          <div className="hero-copy">
            <h2 className="hero-name">Boyd Roberts.</h2>
            <p className="hero-tagline">
              I turn product ideas into production-ready software — clean frontends, resilient
              backends, and AI-integrated workflows.
            </p>
            <ul
              className="hero-stack-row"
              aria-label="Core stack: React, Next.js, Node.js, AI workflows"
            >
              {heroStack.map(({ key, label, Icon }) => (
                <li key={key} className="hero-stack-item">
                  <Icon aria-hidden="true" focusable="false" />
                  <span className="hero-stack-label">{label}</span>
                </li>
              ))}
              <li className="hero-stack-item hero-stack-item--location">
                <FaMapMarkerAlt aria-hidden="true" focusable="false" />
                <span className="hero-stack-label">Central Texas</span>
              </li>
            </ul>
            <div className="hero-cta-row">
              <a className="hero-cta hero-cta--primary" href="#portfolio">
                View work
              </a>
              <a className="hero-cta hero-cta--secondary" href="#contact">
                Get in touch
              </a>
            </div>
            <ul className="hero-proof-list" aria-label="Portfolio proof points">
              {proofItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="about-text">
        Trained at Southern Methodist University and Baylor Professional Education&rsquo;s 255-hour
        Java + Python program. I focus on clean architecture, readable code, and shipping practical
        features that hold up in production.
      </p>

      <div className="about-highlight-grid">
        <RevealItem delay={0}>
          <div className="highlight-item highlight-item--feature">
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

      <RevealItem delay={0}>
        <div className="badge-wrap">
          <a
            href="https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Fullstack}
              alt="Southern Methodist University Full Stack Web Development credential badge"
              loading="lazy"
              decoding="async"
              width={192}
              height={192}
            />
          </a>
          <a href={baylorCertificate} target="_blank" rel="noopener noreferrer">
            <img
              src={BaylorBadge}
              alt="Baylor University Professional Education certificate"
              className="baylor-badge"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </RevealItem>
    </article>
  );
}

export default About;
