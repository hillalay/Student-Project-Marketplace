import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  const requiredSkills = Array.isArray(project.requiredSkills)
    ? project.requiredSkills
    : [];

  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-category">
          {project.category || project.category_name || "Genel"}
        </span>

        <span className="project-status">
          {project.status || "open"}
        </span>
      </div>

      <h3>{project.title}</h3>

      <p className="project-description">{project.description}</p>

      <div className="project-skills">
        {requiredSkills.length > 0 ? (
          requiredSkills.map((skill) => <span key={skill}>{skill}</span>)
        ) : (
          <span>Beceri belirtilmemiş</span>
        )}
      </div>

      <div className="project-meta">
        <div>
          <span>Seviye</span>
          <strong>{project.level || "Belirtilmedi"}</strong>
        </div>

        <div>
          <span>Süre</span>
          <strong>{project.duration || "Belirtilmedi"}</strong>
        </div>

        <div>
          <span>Başvuru</span>
          <strong>{project.applicationCount ?? 0}</strong>
        </div>
      </div>

      <div className="project-footer">
        <div className="project-owner">
          <span>İlan sahibi</span>
          <strong>
            {project.owner || project.owner_name || "Bilinmeyen Kullanıcı"}
          </strong>
        </div>

        <Link to={`/projects/${project.id}`} className="project-detail-button">
          Detayları Gör
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;