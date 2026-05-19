import { Link } from "react-router-dom";
import "../styles/MyApplications.css";

const mockApplications = [
  {
    id: 1,
    projectId: 1,
    projectTitle: "React Bilen Frontend Developer Aranıyor",
    category: "Web Development",
    owner: "Ayşe Demir",
    status: "Beklemede",
    appliedAt: "2026-05-15",
    message:
      "React ve responsive tasarım konusunda deneyimim var. Projede frontend tarafında destek olmak isterim.",
  },
  {
    id: 2,
    projectId: 2,
    projectTitle: "ML Projem İçin Veri Analizi Yapacak Arkadaş Aranıyor",
    category: "Machine Learning",
    owner: "Mehmet Kaya",
    status: "Kabul Edildi",
    appliedAt: "2026-05-14",
    message:
      "Python, Pandas ve veri analizi konularında çalıştım. Veri hazırlama ve sonuç yorumlama kısmında katkı sağlayabilirim.",
  },
  {
    id: 3,
    projectId: 4,
    projectTitle: "UI/UX Tasarım Desteği Aranıyor",
    category: "UI/UX Design",
    owner: "Can Yıldız",
    status: "Reddedildi",
    appliedAt: "2026-05-13",
    message:
      "Figma ile temel arayüz tasarımları hazırlayabiliyorum. Proje için wireframe ve kullanıcı akışı çıkarabilirim.",
  },
];

function MyApplications() {
  const totalApplications = mockApplications.length;
  const acceptedApplications = mockApplications.filter(
    (application) => application.status === "Kabul Edildi"
  ).length;
  const pendingApplications = mockApplications.filter(
    (application) => application.status === "Beklemede"
  ).length;

  const getStatusClassName = (status) => {
    if (status === "Kabul Edildi") {
      return "status-accepted";
    }

    if (status === "Reddedildi") {
      return "status-rejected";
    }

    return "status-pending";
  };

  return (
    <main className="my-applications-page">
      <div className="page-container">
        <section className="my-applications-header">
          <div>
            <span className="my-applications-badge">Başvurularım</span>

            <h1>Projelere yaptığın başvuruları takip et.</h1>

            <p>
              Başvurduğun projeleri, başvuru mesajlarını ve başvuru durumlarını
              bu ekrandan görüntüleyebilirsin.
            </p>
          </div>

          <Link to="/projects" className="browse-projects-button">
            Yeni Proje Keşfet
          </Link>
        </section>

        <section className="application-summary-grid">
          <div className="application-summary-card">
            <strong>{totalApplications}</strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="application-summary-card">
            <strong>{acceptedApplications}</strong>
            <span>Kabul edilen</span>
          </div>

          <div className="application-summary-card">
            <strong>{pendingApplications}</strong>
            <span>Bekleyen</span>
          </div>
        </section>

        <section className="applications-list">
          {mockApplications.map((application) => (
            <article className="application-card" key={application.id}>
              <div className="application-main">
                <div className="application-top">
                  <span className="application-category">
                    {application.category}
                  </span>

                  <span
                    className={`application-status ${getStatusClassName(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <h2>{application.projectTitle}</h2>

                <p className="application-message">{application.message}</p>

                <div className="application-meta-row">
                  <div>
                    <span>İlan sahibi</span>
                    <strong>{application.owner}</strong>
                  </div>

                  <div>
                    <span>Başvuru tarihi</span>
                    <strong>{application.appliedAt}</strong>
                  </div>
                </div>
              </div>

              <div className="application-actions">
                <Link
                  to={`/projects/${application.projectId}`}
                  className="application-view-button"
                >
                  Projeyi Gör
                </Link>

                <button type="button" className="application-message-button">
                  Mesajı Gör
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="applications-note">
          <h3>Not</h3>
          <p>
            Bu sayfa şu an mock data ile çalışıyor. Backend entegrasyonu
            eklendiğinde burada giriş yapan kullanıcının gerçek başvuruları ve
            başvuru durumları listelenecek.
          </p>
        </section>
      </div>
    </main>
  );
}

export default MyApplications;