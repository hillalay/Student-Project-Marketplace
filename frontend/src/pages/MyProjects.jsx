import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProject, getProjects } from "../services/projectService";
import { getUser } from "../services/authService";
import "../styles/MyProjects.css";

function formatProject(project) {
  return {
    ...project,
    category: project.category_name || "Genel",
    requiredSkills: project.required_skills
      ? project.required_skills.split(",").map((skill) => skill.trim())
      : [],
    applicationCount: project.application_count ?? 0,
    createdAt: project.created_at
      ? new Date(project.created_at).toLocaleDateString("tr-TR")
      : "Belirtilmedi",
  };
}

function MyProjects() {
  const currentUser = getUser();
  const [myProjects, setMyProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const fetchMyProjects = async () => {
    try {
      setErrorMessage("");
      const data = await getProjects();
      const projects = Array.isArray(data) ? data : [];
      const ownerProjects = projects
        .filter((project) => String(project.owner_id) === String(currentUser?.id))
        .map(formatProject);

      setMyProjects(ownerProjects);
    } catch (error) {
      setErrorMessage(error.message || "Projelerin yüklenirken hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleDelete = async (project) => {
    const confirmed = window.confirm(
      `"${project.title}" ilanını silmek istediğine emin misin?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeletingId(project.id);
      setErrorMessage("");
      setInfoMessage("");

      await deleteProject(project.id);
      setInfoMessage("Proje ilanı başarıyla silindi.");
      await fetchMyProjects();
    } catch (error) {
      setErrorMessage(error.message || "Proje silinirken hata oluştu.");
    } finally {
      setIsDeletingId(null);
    }
  };

  const totalApplications = myProjects.reduce(
    (total, project) => total + project.applicationCount,
    0
  );
  const openProjects = myProjects.filter(
    (project) => project.status === "open"
  ).length;

  return (
    <main className="my-projects-page">
      <div className="page-container">
        <section className="my-projects-header">
          <div>
            <span className="my-projects-badge">Benim Projelerim</span>

            <h1>Oluşturduğun proje ilanlarını yönet.</h1>

            <p>
              Yayındaki proje ilanlarını görüntüle, gelen başvuru sayılarını
              takip et ve ilan detaylarına hızlıca ulaş.
            </p>
          </div>

          <Link to="/projects/create" className="new-project-button">
            Yeni İlan Oluştur
          </Link>
        </section>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        {infoMessage && (
          <div className="my-projects-info-message">{infoMessage}</div>
        )}

        <section className="my-projects-summary">
          <div className="summary-card">
            <strong>{isLoading ? "..." : myProjects.length}</strong>
            <span>Toplam ilan</span>
          </div>

          <div className="summary-card">
            <strong>{isLoading ? "..." : totalApplications}</strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="summary-card">
            <strong>{isLoading ? "..." : openProjects}</strong>
            <span>Açık ilan</span>
          </div>
        </section>

        {isLoading ? (
          <section className="my-projects-note">
            <h3>Projelerin yükleniyor...</h3>
            <p>Backend'den oluşturduğun proje ilanları getiriliyor.</p>
          </section>
        ) : myProjects.length > 0 ? (
          <section className="my-projects-list">
            {myProjects.map((project) => (
              <article className="my-project-card" key={project.id}>
                <div className="my-project-main">
                  <div className="my-project-top">
                    <span className="my-project-category">
                      {project.category}
                    </span>

                    <span className="my-project-status">{project.status}</span>
                  </div>

                  <h2>{project.title}</h2>

                  <p>{project.description}</p>

                  <div className="my-project-skills">
                    {project.requiredSkills.length > 0 ? (
                      project.requiredSkills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    ) : (
                      <span>Beceri belirtilmemiş</span>
                    )}
                  </div>
                </div>

                <div className="my-project-side">
                  <div className="side-info">
                    <span>Başvuru</span>
                    <strong>{project.applicationCount}</strong>
                  </div>

                  <div className="side-info">
                    <span>Oluşturulma</span>
                    <strong>{project.createdAt}</strong>
                  </div>

                  <div className="my-project-actions">
                    <Link to={`/projects/${project.id}`} className="view-button">
                      Detayları Gör
                    </Link>

                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="edit-button"
                    >
                      Düzenle
                    </Link>

                    <Link
                      to="/applications-received"
                      className="received-link-button"
                    >
                      Başvurular
                    </Link>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(project)}
                      disabled={isDeletingId === project.id}
                    >
                      {isDeletingId === project.id ? "Siliniyor..." : "Sil"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="my-projects-note">
            <h3>Henüz proje ilanı oluşturmadın</h3>
            <p>
              Yeni ilan oluşturarak ekip arkadaşı aramaya başlayabilirsin.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default MyProjects;
