import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import { applyToProject } from "../services/applicationService";
import { getUser, isAuthenticated } from "../services/authService";
import "../styles/ProjectDetail.css";

function ProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [message, setMessage] = useState(
    "Merhaba, bu projeyle ilgileniyorum. İlgili beceriler konusunda deneyimim var ve ekip çalışmasına katkı sağlayabileceğimi düşünüyorum."
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const currentUser = getUser();

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);

        const formattedProject = {
          ...data,
          category: data.category_name || "Genel",
          owner: data.owner_name || "Bilinmeyen Kullanıcı",
          requiredSkills: data.required_skills
            ? data.required_skills.split(",").map((skill) => skill.trim())
            : [],
          applicationCount: data.application_count ?? 0,
          createdAt: data.created_at
            ? new Date(data.created_at).toLocaleDateString("tr-TR")
            : "Belirtilmedi",
        };

        setProject(formattedProject);
      } catch (error) {
        setErrorMessage(error.message || "Proje detayı yüklenirken hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  const handleApply = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!isAuthenticated()) {
      setErrorMessage("Başvuru yapabilmek için giriş yapmalısın.");
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Başvuru mesajı boş olamaz.");
      return;
    }

    try {
      setIsApplying(true);

      await applyToProject(project.id, message);

      setSuccessMessage("Başvurun başarıyla gönderildi.");
    } catch (error) {
      setErrorMessage(error.message || "Başvuru gönderilirken hata oluştu.");
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return (
      <main className="project-detail-page">
        <div className="page-container">
          <section className="project-not-found">
            <h1>Proje yükleniyor...</h1>
            <p>Backend’den proje detayı getiriliyor.</p>
          </section>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-detail-page">
        <div className="page-container">
          <section className="project-not-found">
            <h1>Proje bulunamadı</h1>
            <p>
              Aradığın proje ilanı bulunamadı. İlan kaldırılmış olabilir veya
              yanlış bir bağlantı kullanılmış olabilir.
            </p>

            <Link to="/projects">Proje ilanlarına dön</Link>
          </section>
        </div>
      </main>
    );
  }

  const isOwner = currentUser && currentUser.id === project.owner_id;

  return (
    <main className="project-detail-page">
      <div className="page-container">
        <Link to="/projects" className="back-link">
          ← Proje ilanlarına dön
        </Link>

        <section className="project-detail-layout">
          <article className="project-detail-main">
            <div className="detail-top">
              <span className="detail-category">{project.category}</span>
              <span className="detail-status">{project.status}</span>
            </div>

            <h1>{project.title}</h1>

            <p className="detail-description">{project.description}</p>

            <div className="detail-section">
              <h2>Gerekli beceriler</h2>

              <div className="detail-skills">
                {project.requiredSkills.length > 0 ? (
                  project.requiredSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))
                ) : (
                  <span>Beceri belirtilmemiş</span>
                )}
              </div>
            </div>

            <div className="detail-section">
              <h2>Proje hakkında</h2>

              <p>
                Bu proje ilanı, öğrencilerin ekip arkadaşı bulmasını
                kolaylaştırmak için oluşturulmuştur. Başvuru yapmadan önce
                gerekli becerileri ve ilan sahibinin beklentisini dikkatlice
                inceleyebilirsin.
              </p>
            </div>

            <div className="detail-section">
              <h2>Başvuru mesajı</h2>

              <textarea
                className="message-preview"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={5}
                disabled={isOwner}
              />
            </div>

            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}
          </article>

          <aside className="project-detail-sidebar">
            <div className="sidebar-card">
              <h3>İlan Bilgileri</h3>

              <div className="sidebar-info-list">
                <div>
                  <span>İlan sahibi</span>
                  <strong>{project.owner}</strong>
                </div>

                <div>
                  <span>Seviye</span>
                  <strong>{project.level || "Belirtilmedi"}</strong>
                </div>

                <div>
                  <span>Süre</span>
                  <strong>{project.duration || "Belirtilmedi"}</strong>
                </div>

                <div>
                  <span>Başvuru sayısı</span>
                  <strong>{project.applicationCount}</strong>
                </div>

                <div>
                  <span>Oluşturulma tarihi</span>
                  <strong>{project.createdAt}</strong>
                </div>
              </div>

              {isOwner ? (
                <p className="apply-note">
                  Bu proje sana ait olduğu için kendi projenize başvuru
                  yapamazsın.
                </p>
              ) : (
                <button
                  type="button"
                  className="apply-button"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? "Başvuru gönderiliyor..." : "Projeye Başvur"}
                </button>
              )}

              <p className="apply-note">
                Başvuru gönderildiğinde proje sahibi başvurunu görüntüleyebilir
                ve kabul veya red olarak güncelleyebilir.
              </p>
            </div>

            <div className="sidebar-card soft-card">
              <h3>Uygun musun?</h3>
              <p>
                Bu ilandaki becerilerden birkaçına sahipsen başvuru yapabilir,
                deneyimini kısa bir mesajla açıklayabilirsin.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default ProjectDetail;
