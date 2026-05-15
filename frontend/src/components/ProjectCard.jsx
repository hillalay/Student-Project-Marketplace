import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-category">{project.category}</span>
        <span className="project-status">{project.status}</span>
      </div>

      <h3>{project.title}</h3>

      <p className="project-description">{project.description}</p>

      <div className="project-skills">
        {project.requiredSkills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="project-meta">
        <div>
          <span>Seviye</span>
          <strong>{project.level}</strong>
        </div>

        <div>
          <span>Süre</span>
          <strong>{project.duration}</strong>
        </div>

        <div>
          <span>Başvuru</span>
          <strong>{project.applicationCount}</strong>
        </div>
      </div>

      <div className="project-footer">
        <div className="project-owner">
          <span>İlan sahibi</span>
          <strong>{project.owner}</strong>
        </div>

        <Link to={`/projects/${project.id}`} className="project-detail-button">
          Detayları Gör
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;