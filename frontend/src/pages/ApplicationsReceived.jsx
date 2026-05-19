import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/projectService";
import {
  getProjectApplications,
  updateApplicationStatus,
} from "../services/applicationService";
import { getUser } from "../services/authService";
import "../styles/ApplicationsReceived.css";

function formatStatusLabel(status) {
  if (status === "accepted") {
    return "Kabul Edildi";
  }

  if (status === "rejected") {
    return "Reddedildi";
  }

  return "Beklemede";
}

function getStatusClassName(status) {
  if (status === "accepted") {
    return "received-status-accepted";
  }

  if (status === "rejected") {
    return "received-status-rejected";
  }

  return "received-status-pending";
}

function ApplicationsReceived() {
  const currentUser = getUser();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setErrorMessage("");
      const projectsData = await getProjects();
      const ownerProjects = Array.isArray(projectsData)
        ? projectsData.filter(
            (project) => String(project.owner_id) === String(currentUser?.id)
          )
        : [];

      const applicationGroups = await Promise.all(
        ownerProjects.map(async (project) => {
          const projectApplications = await getProjectApplications(project.id);

          return Array.isArray(projectApplications)
            ? projectApplications.map((application) => ({
                ...application,
                projectTitle: project.title,
                projectCategory: project.category_name || "Genel",
              }))
            : [];
        })
      );

      setApplications(applicationGroups.flat());
    } catch (error) {
      setErrorMessage(
        error.message || "Gelen başvurular yüklenirken hata oluştu."
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      setErrorMessage("");
      setSuccessMessage("");

      await updateApplicationStatus(applicationId, status);
      setSuccessMessage("Başvuru durumu başarıyla güncellendi.");
      await fetchApplications();
    } catch (error) {
      setErrorMessage(
        error.message || "Başvuru durumu güncellenirken hata oluştu."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const totalApplications = applications.length;
  const acceptedCount = applications.filter(
    (application) => application.status === "accepted"
  ).length;
  const pendingCount = applications.filter(
    (application) => application.status === "pending"
  ).length;

  return (
    <main className="applications-received-page">
      <div className="page-container">
        <section className="applications-received-header">
          <div>
            <span className="applications-received-badge">
              Gelen Başvurular
            </span>

            <h1>Projelerine gelen başvuruları yönet.</h1>

            <p>
              Öğrencilerin başvuru mesajlarını incele, uygun adayları kabul et
              veya başvuruları reddet.
            </p>
          </div>

          <Link to="/my-projects" className="go-my-projects-button">
            Benim Projelerim
          </Link>
        </section>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <section className="received-summary-grid">
          <div className="received-summary-card">
            <strong>{isLoading ? "..." : totalApplications}</strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="received-summary-card">
            <strong>{isLoading ? "..." : acceptedCount}</strong>
            <span>Kabul edilen</span>
          </div>

          <div className="received-summary-card">
            <strong>{isLoading ? "..." : pendingCount}</strong>
            <span>Bekleyen</span>
          </div>
        </section>

        {isLoading ? (
          <section className="received-note">
            <h3>Başvurular yükleniyor...</h3>
            <p>Backend'den projelerine gelen başvurular getiriliyor.</p>
          </section>
        ) : applications.length > 0 ? (
          <section className="received-list">
            {applications.map((application) => (
              <article className="received-card" key={application.id}>
                <div className="received-main">
                  <div className="received-top">
                    <span className="received-category">
                      {application.projectCategory}
                    </span>

                    <span
                      className={`received-status ${getStatusClassName(
                        application.status
                      )}`}
                    >
                      {formatStatusLabel(application.status)}
                    </span>
                  </div>

                  <h2>{application.projectTitle}</h2>

                  <div className="applicant-box">
                    <div className="applicant-avatar">
                      {(application.applicant_name || "?").charAt(0)}
                    </div>

                    <div>
                      <strong>
                        {application.applicant_name || "Bilinmeyen Kullanıcı"}
                      </strong>
                      <span>{application.applicant_email || "E-posta yok"}</span>
                    </div>
                  </div>

                  <div className="received-section">
                    <h3>Başvuru mesajı</h3>
                    <p>{application.message || "Başvuru mesajı bulunmuyor."}</p>
                  </div>

                  <div className="received-meta-row">
                    <div>
                      <span>Başvuru tarihi</span>
                      <strong>
                        {application.created_at
                          ? new Date(application.created_at).toLocaleDateString(
                              "tr-TR"
                            )
                          : "Belirtilmedi"}
                      </strong>
                    </div>
                  </div>
                </div>

                <aside className="received-actions">
                  <Link
                    to={`/projects/${application.project_id}`}
                    className="received-view-button"
                  >
                    Projeyi Gör
                  </Link>

                  <button
                    type="button"
                    className="accept-button"
                    onClick={() =>
                      handleStatusChange(application.id, "accepted")
                    }
                    disabled={updatingId === application.id}
                  >
                    Kabul Et
                  </button>

                  <button
                    type="button"
                    className="reject-button"
                    onClick={() =>
                      handleStatusChange(application.id, "rejected")
                    }
                    disabled={updatingId === application.id}
                  >
                    Reddet
                  </button>
                </aside>
              </article>
            ))}
          </section>
        ) : (
          <section className="received-note">
            <h3>Henüz gelen başvuru yok</h3>
            <p>
              Projelerine başvuru geldiğinde aday bilgileri ve durum yönetimi
              burada görünecek.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

export default ApplicationsReceived;
