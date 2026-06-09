import { memo, useState } from "react";
import { projects } from "../../data/projects";
import RevealItem from "../RevealItem";

// Hoisted: `projects` is a module-static array, so the priority order never
// changes between renders. Doing this at module scope avoids a per-mount
// useMemo and the array allocation it would cache.
const projectsByPriority = [
  ...projects.filter((project) => project.featured),
  ...projects.filter((project) => !project.featured),
];

const ProjectCard = memo(function ProjectCard({ project, isLead = false }) {
  const [imageFailed, setImageFailed] = useState(!project.image);
  // Cheap slice + join — useMemo's bookkeeping costs more than the work and
  // the parent <ProjectCard /> is already memo'd, so reference stability of
  // the array doesn't buy anything downstream.
  const coverTags = project.tags.slice(0, 3);
  const stack = project.tags.slice(0, 4).join(" • ");
  const previewHref = project.demo || project.repo;
  const previewLabel = project.demo ? `${project.name} live demo` : `${project.name} repository`;
  // Action links read only "Live"/"Source" visually; give assistive tech the
  // project context so they're distinguishable in a screen-reader links list.
  // Verb-prefixed to stay distinct from the image link's `previewLabel`.
  const liveLabel = `Open ${project.name} live demo`;
  const sourceLabel = `View ${project.name} source code`;
  const cardClass = [
    "project-card",
    project.featured ? "project-card--featured" : "",
    isLead ? "project-card--lead" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClass}>

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
            srcSet={project.imageSrcSet}
            sizes="(min-width: 900px) 700px, 100vw"
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
                aria-label={liveLabel}
              >
                Live
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sourceLabel}
              >
                Source
              </a>
            </>
          ) : (
            <>
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sourceLabel}
              >
                Source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-link"
                  aria-label={liveLabel}
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
  return (
    <section className="portfolio-panel portfolio-panel--minimal">
      <p className="section-eyebrow">Selected Work · {projects.length} Projects</p>
      <h2 className="panel-title">Selected Work</h2>
      <p className="project-note">
        Minimal case studies from real builds, focused on outcomes, architecture choices, and
        production quality.
      </p>
      <div className="project-grid project-grid--symmetrical">
        {projectsByPriority.map((project, i) => (
          <RevealItem delay={Math.min(i, 5)} key={project.name}>
            <ProjectCard project={project} isLead={i === 0} />
          </RevealItem>
        ))}
      </div>
      <p className="project-archive">
        <a
          className="project-archive-link"
          href="https://github.com/coleyrockin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Full project archive on GitHub
        </a>
      </p>
    </section>
  );
}

export default Portfolio;
