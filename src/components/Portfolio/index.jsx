import { memo, useMemo, useState } from "react";
import { projects } from "../../data/projects";
import RevealItem from "../RevealItem";

const ProjectCard = memo(function ProjectCard({ project, isLead = false, index = 0 }) {
  const [imageFailed, setImageFailed] = useState(!project.image);
  const coverTags = useMemo(() => project.tags.slice(0, 3), [project.tags]);
  const stack = useMemo(() => project.tags.slice(0, 4).join(" • "), [project.tags]);
  const previewHref = project.demo || project.repo;
  const previewLabel = project.demo ? `${project.name} live demo` : `${project.name} repository`;
  const cardClass = [
    "project-card",
    project.featured ? "project-card--featured" : "",
    isLead ? "project-card--lead" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const projectNum = String(index + 1).padStart(2, "0");

  return (
    <article className={cardClass}>
      <span className="project-num" aria-hidden="true">
        {projectNum}
      </span>
      {project.featured && (
        <p className="project-featured-tag" aria-hidden="true">
          Featured Case Study
        </p>
      )}
      <a
        href={previewHref}
        target="_blank"
        rel="noopener noreferrer"
        className="project-image-link"
        aria-label={previewLabel}
      >
        {imageFailed ? (
          <div className="project-image-fallback" aria-label={`${project.name} preview fallback`}>
            <p className="project-image-kicker">Project Snapshot</p>
            <h4>{project.name}</h4>
            <div className="project-image-chip-wrap">
              {coverTags.map((tag) => (
                <span className="project-image-chip" key={`${project.name}-fallback-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.imageAlt || `${project.name} project preview`}
            className="project-image"
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            onError={() => setImageFailed(true)}
          />
        )}
      </a>
      <div className="project-content">
        {project.category && <p className="project-category">{project.category}</p>}
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p className="project-meta">{project.scope}</p>
        <p className="project-stack" aria-label={`${project.name} technology stack`}>
          <span>Stack</span> {stack}
        </p>
        {project.metrics?.length > 0 && (
          <dl className="project-metrics" aria-label={`${project.name} key metrics`}>
            {project.metrics.map((metric) => (
              <div className="project-metric" key={`${project.name}-${metric.label}`}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="project-actions">
          {project.featured && project.demo ? (
            <>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="demo-link"
              >
                Live
              </a>
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </>
          ) : (
            <>
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-link"
                >
                  Live
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
});

function Portfolio() {
  const projectsByPriority = useMemo(() => {
    const featured = projects.filter((project) => project.featured);
    const standard = projects.filter((project) => !project.featured);
    return [...featured, ...standard];
  }, []);

  return (
    <section className="portfolio-panel portfolio-panel--minimal">
      <p className="section-eyebrow">
        <span className="section-eyebrow-num">02</span> Selected Work · {projects.length} Projects
      </p>
      <h2 className="panel-title">Selected Work</h2>
      <p className="project-note">
        Minimal case studies from real builds, focused on outcomes, architecture choices, and
        production quality.
      </p>
      <div className="project-grid project-grid--symmetrical">
        {projectsByPriority.map((project, i) => (
          <RevealItem delay={Math.min(i, 5)} key={project.name}>
            <ProjectCard project={project} isLead={i === 0} index={i} />
          </RevealItem>
        ))}
      </div>
    </section>
  );
}

export default Portfolio;
