import React from "react";
import ImgMe from "../../assets/images/MeBGrm.png";
import Fullstack from "../../assets/images/fullstack.png";
import BaylorBadge from "../../assets/images/baylor-badge.svg";
import RevealItem from "../RevealItem";

function About() {
  const baylorCertificate = `${process.env.PUBLIC_URL}/certificates/baylor-java-python-certificate.pdf`;

  return (
    <article className="about-panel">
      <div className="about-header">
        <div className="profile-photo-wrap">
          <img className="profile-photo" height={180} width={180} src={ImgMe} alt="Boyd Roberts" />
        </div>
        <div>
          <p className="about-kicker">Full-stack engineer with 6 shipped projects</p>
          <h2 className="about-title">Software Engineer</h2>
          <p className="about-text">
            Full-stack software engineer specializing in the MERN stack with certifications in Java and Python. I build
            production-grade applications across the full development lifecycle — from API design and data modeling to
            polished, responsive UIs.
          </p>
        </div>
      </div>

      <p className="about-text">
        Trained at Southern Methodist University and through Baylor Professional Education's 255-hour Java + Python
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
            <img src={Fullstack} alt="Southern Methodist University Full Stack Web Development credential badge" />
          </a>
          <a href={baylorCertificate} target="_blank" rel="noopener noreferrer">
            <img src={BaylorBadge} alt="Baylor University Professional Education certificate" className="baylor-badge" />
          </a>
        </div>
      </RevealItem>
    </article>
  );
}

export default About;
