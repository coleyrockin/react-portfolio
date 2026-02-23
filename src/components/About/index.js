import React from "react";
import ImgMe from "../../assets/images/MeBGrm.png";
import Fullstack from "../../assets/images/fullstack.png";

function About() {
  const baylorCertificate = `${process.env.PUBLIC_URL}/certificates/baylor-java-python-certificate.pdf`;

  return (
    <article className="about-panel">
      <div className="about-header">
        <img className="profile-photo" height={180} width={180} src={ImgMe} alt="Boyd Roberts" />
        <div>
          <p className="about-kicker">Building modern web applications</p>
          <h2 className="about-title">Developer</h2>
          <p className="about-text">
            Full stack developer with a strong foundation in customer service, recovery work, and business-focused
            problem solving. I enjoy shipping useful products and learning fast across the full development lifecycle.
          </p>
        </div>
      </div>

      <p className="about-text">
        My core stack is MERN, and I continue to expand into Java, Python, and cloud services. I completed developer
        training at Southern Methodist University and a 255-hour Java Programmer + Python Developer program through
        Baylor Professional Education.
      </p>

      <div className="about-highlight-grid">
        <div className="highlight-item">
          <h3>Core Stack</h3>
          <p>MongoDB, Express, React, Node.js, SQL, REST APIs</p>
        </div>
        <div className="highlight-item">
          <h3>Focus</h3>
          <p>Readable code, practical UX, and production-ready features</p>
        </div>
        <div className="highlight-item">
          <h3>Current Growth</h3>
          <p>Java, Python, AWS, and broader software engineering depth</p>
        </div>
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

      <div className="badge-wrap">
        <a href="https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url" target="_blank" rel="noopener noreferrer">
          <img src={Fullstack} alt="Southern Methodist University developer credential badge" />
        </a>
      </div>
    </article>
  );
}

export default About;
