import { Link, useParams } from "react-router-dom";
import { mockProjects } from "../data/mockProjects";
import "./ProjectDetail.css";


function ProjectDetail() {
  const { id } = useParams();

  const project = mockProjects.find(
    (projectItem) => projectItem.id === Number(id)
  );

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
                {project.requiredSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2>Proje hakkında</h2>

              <p>
                Bu proje ilanı, öğrencilerin ekip arkadaşı bulmasını
                kolaylaştırmak için oluşturulmuştur. Başvuru yapmadan önce
                gerekli becerileri, proje süresini ve ilan sahibinin beklentisini
                dikkatlice inceleyebilirsin.
              </p>
            </div>

            <div className="detail-section">
              <h2>Başvuru mesajı önerisi</h2>

              <div className="message-preview">
                Merhaba, bu projeyle ilgileniyorum. İlgili beceriler konusunda
                deneyimim var ve ekip çalışmasına katkı sağlayabileceğimi
                düşünüyorum.
              </div>
            </div>
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
                  <strong>{project.level}</strong>
                </div>

                <div>
                  <span>Süre</span>
                  <strong>{project.duration}</strong>
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

              <Link to={`/projects/${project.id}/apply`} className="apply-button">
                Projeye Başvur
              </Link>

              <p className="apply-note">
                Başvuru özelliği şu an arayüz olarak hazırlandı. Backend
                entegrasyonu eklendiğinde gerçek başvuru gönderilecek.
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