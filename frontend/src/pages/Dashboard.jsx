import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import "./Dashboard.css";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        setErrorMessage(error.message || "Projeler yüklenirken hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const openProjectsCount = projects.filter(
    (project) => project.status === "open",
  ).length;

  const categoryCount = new Set(
    projects.map((project) => project.category_name).filter(Boolean),
  ).size;

  const ownerCount = new Set(
    projects.map((project) => project.owner_id).filter(Boolean),
  ).size;

  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="page dashboard-page">
      <div className="page-container">
        <section className="dashboard-hero card">
          <div className="hero-content">
            <span className="eyebrow">Student Project Marketplace</span>

            <h1 className="page-title">
              Bir sonraki öğrenci projen için doğru ekip arkadaşlarını bul.
            </h1>

            <p className="page-description">
              Proje fikirlerini paylaş, belirli becerilere sahip öğrencileri bul
              ve ilgi alanına uygun projelere başvur.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="primary-button">
                Projeleri Keşfet
              </Link>

              <Link to="/projects/create" className="secondary-button">
                Proje İlanı Oluştur
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            {isLoading && (
              <div className="mini-card yellow-card">
                <span>Yükleniyor</span>
                <strong>Projeler getiriliyor...</strong>
              </div>
            )}

            {!isLoading && featuredProjects.length === 0 && (
              <div className="mini-card yellow-card">
                <span>Henüz proje yok</span>
                <strong>İlk proje ilanını oluşturabilirsin.</strong>
              </div>
            )}

            {!isLoading &&
              featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`mini-card ${
                    index === 0
                      ? "yellow-card"
                      : index === 1
                        ? "pink-card"
                        : "green-card"
                  }`}
                >
                  <span>{project.category_name || "Genel"}</span>
                  <strong>{project.title}</strong>
                </div>
              ))}
          </div>
        </section>

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <section className="dashboard-stats">
          <div className="stat-card">
            <strong>{isLoading ? "..." : openProjectsCount}</strong>
            <span>Açık Proje</span>
          </div>

          <div className="stat-card">
            <strong>{isLoading ? "..." : categoryCount}</strong>
            <span>Kategori</span>
          </div>

          <div className="stat-card">
            <strong>{isLoading ? "..." : ownerCount}</strong>
            <span>Proje Sahibi</span>
          </div>
        </section>

        <section className="dashboard-features">
          <div className="feature-card card">
            <h3>Proje ilanı oluştur</h3>
            <p>
              Proje fikrini açıkla ve ekipte ihtiyaç duyduğun becerileri belirt.
            </p>
          </div>

          <div className="feature-card card">
            <h3>Projeye başvur</h3>
            <p>
              Açık projeleri incele, kısa bir başvuru mesajıyla ekibe katılmak
              için başvur.
            </p>
          </div>

          <div className="feature-card card">
            <h3>Başvuruları yönet</h3>
            <p>
              Proje sahipleri gelen başvuruları inceleyebilir, uygun adayları
              kabul veya reddedebilir.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
