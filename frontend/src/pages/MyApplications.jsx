import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";
import "../styles/MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchMyApplications() {
      try {
        const data = await getMyApplications();

        const formattedApplications = Array.isArray(data)
          ? data.map((application) => ({
              id: application.id,
              projectId: application.project_id,
              projectTitle: application.project_title,
              category: application.category_name || "Genel",
              owner: application.owner_name || "Bilinmeyen Kullanıcı",
              status: application.status,
              appliedAt: application.created_at
                ? new Date(application.created_at).toLocaleDateString("tr-TR")
                : "Belirtilmedi",
              message: application.message || "Başvuru mesajı bulunmuyor.",
            }))
          : [];

        setApplications(formattedApplications);
      } catch (error) {
        setErrorMessage(
          error.message || "Başvurular yüklenirken hata oluştu."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchMyApplications();
  }, []);

  const totalApplications = applications.length;

  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted"
  ).length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  const getStatusLabel = (status) => {
    if (status === "accepted") {
      return "Kabul Edildi";
    }

    if (status === "rejected") {
      return "Reddedildi";
    }

    return "Beklemede";
  };

  const getStatusClassName = (status) => {
    if (status === "accepted") {
      return "status-accepted";
    }

    if (status === "rejected") {
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

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        <section className="application-summary-grid">
          <div className="application-summary-card">
            <strong>{isLoading ? "..." : totalApplications}</strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="application-summary-card">
            <strong>{isLoading ? "..." : acceptedApplications}</strong>
            <span>Kabul edilen</span>
          </div>

          <div className="application-summary-card">
            <strong>{isLoading ? "..." : pendingApplications}</strong>
            <span>Bekleyen</span>
          </div>
        </section>

        {isLoading ? (
          <section className="applications-note">
            <h3>Başvurular yükleniyor...</h3>
            <p>Backend’den başvuru bilgilerin getiriliyor.</p>
          </section>
        ) : applications.length > 0 ? (
          <section className="applications-list">
            {applications.map((application) => (
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
                      {getStatusLabel(application.status)}
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
        ) : (
          <section className="applications-note">
            <h3>Henüz başvurun yok</h3>
            <p>
              Projeleri keşfedip ilgini çeken bir ilana başvuru yaptığında
              burada görüntülenecek.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default MyApplications;
