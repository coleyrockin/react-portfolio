import ICON_BY_KEY from "../../data/iconMap";
import { socialLinks } from "../../data/socialLinks";
import RevealItem from "../RevealItem";

function Contact() {
  return (
    <article className="contact-panel">
      <p className="section-eyebrow"><span className="section-eyebrow-num">04</span> Reach Out</p>
      <h2 className="panel-title">Contact</h2>
      <p className="contact-intro">
        For engineering opportunities, reach me directly by email, LinkedIn, or GitHub.
      </p>

      <section className="social-grid" aria-label="Social Profiles">
        {socialLinks.map((profile, i) => {
          const Icon = ICON_BY_KEY[profile.key];
          return (
            <RevealItem delay={Math.min(i, 5)} key={profile.key}>
              <a
                className="social-card"
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${profile.name}: ${profile.handle}`}
              >
                <div className="social-icon-wrap">{Icon ? <Icon /> : null}</div>
                <div className="social-text">
                  <span className="social-name">{profile.name}</span>
                  <span className="social-handle">{profile.handle}</span>
                </div>
              </a>
            </RevealItem>
          );
        })}
      </section>
    </article>
  );
}

export default Contact;
