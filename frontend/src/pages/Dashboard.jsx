import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
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
              Proje fikirlerini paylaş, belirli becerilere sahip öğrencileri
              bul ve ilgi alanına uygun projelere başvur.
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
            <div className="mini-card yellow-card">
              <span>React</span>
              <strong>Frontend ekip arkadaşı aranıyor</strong>
            </div>

            <div className="mini-card pink-card">
              <span>Machine Learning</span>
              <strong>Veri analizi desteği aranıyor</strong>
            </div>

            <div className="mini-card green-card">
              <span>Flutter</span>
              <strong>Mobil geliştirici aranıyor</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <strong>24+</strong>
            <span>Açık Proje</span>
          </div>

          <div className="stat-card">
            <strong>12</strong>
            <span>Kategori</span>
          </div>

          <div className="stat-card">
            <strong>80+</strong>
            <span>Öğrenci Profili</span>
          </div>
        </section>

        <section className="dashboard-features">
          <div className="feature-card card">
            <h3>Proje ilanı oluştur</h3>
            <p>
              Proje fikrini açıkla ve ekipte ihtiyaç duyduğun becerileri
              belirt.
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