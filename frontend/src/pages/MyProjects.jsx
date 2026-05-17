import { useState } from "react";
import { Link } from "react-router-dom";
import { mockProjects } from "../data/mockProjects";
import "./MyProjects.css";

function MyProjects() {
  const myProjects = mockProjects.slice(0, 3);
  const [infoMessage, setInfoMessage] = useState("");

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

      {infoMessage && (
        <div className="my-projects-info-message">
        {infoMessage}
        </div>
      )}

        <section 
        className="my-projects-summary">
          <div className="summary-card">
            <strong>{myProjects.length}</strong>
            <span>Toplam ilan</span>
          </div>

          <div className="summary-card">
            <strong>
              {myProjects.reduce(
                (total, project) => total + project.applicationCount,
                0
              )}
            </strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="summary-card">
            <strong>
              {myProjects.filter((project) => project.status === "Açık").length}
            </strong>
            <span>Açık ilan</span>
          </div>
        </section>

        <section className="my-projects-list">
          {myProjects.map((project) => (
            <article className="my-project-card" key={project.id}>
              <div className="my-project-main">
                <div className="my-project-top">
                  <span className="my-project-category">
                    {project.category}
                  </span>

                  <span className="my-project-status">
                    {project.status}
                  </span>
                </div>

                <h2>{project.title}</h2>

                <p>{project.description}</p>

                <div className="my-project-skills">
                  {project.requiredSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>

              <div className="my-project-side">
                <div className="side-info">
                  <span>Başvuru</span>
                  <strong>{project.applicationCount}</strong>
                </div>

                <div className="side-info">
                  <span>Seviye</span>
                  <strong>{project.level}</strong>
                </div>

                <div className="side-info">
                  <span>Süre</span>
                  <strong>{project.duration}</strong>
                </div>

                <div className="my-project-actions">
                  <Link to={`/projects/${project.id}`} className="view-button">
                    Detayları Gör
                  </Link>

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      setInfoMessage(
                        `"${project.title}" ilanını düzenleme özelliği şu an arayüz seviyesinde hazırlandı. Backend entegrasyonu eklendiğinde bu buton gerçek düzenleme sayfasına bağlanacak.`
                      )
                    }
                  >
                    Düzenle
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="my-projects-note">
          <h3>Not</h3>
          <p>
            Bu sayfa şu an mock data ile çalışıyor. Backend entegrasyonu
            eklendiğinde burada sadece giriş yapan kullanıcının oluşturduğu
            proje ilanları listelenecek.
          </p>
        </section>
      </div>
    </main>
  );
}

export default MyProjects;