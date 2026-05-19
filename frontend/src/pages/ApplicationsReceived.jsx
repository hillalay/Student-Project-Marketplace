import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ApplicationsReceived.css";

const initialApplications = [
  {
    id: 1,
    projectId: 1,
    projectTitle: "React Bilen Frontend Developer Aranıyor",
    applicantName: "Deniz Aksoy",
    applicantEmail: "deniz.aksoy@ogrenci.edu.tr",
    category: "Web Development",
    status: "Beklemede",
    appliedAt: "2026-05-15",
    message:
      "React, JavaScript ve responsive tasarım konularında deneyimim var. Projede frontend component yapısı ve sayfa tasarımlarında destek olmak isterim.",
    experience:
      "Daha önce React ile küçük ölçekli dashboard ve form tabanlı uygulamalar geliştirdim.",
    availability: "Haftada 4-6 saat",
  },
  {
    id: 2,
    projectId: 1,
    projectTitle: "React Bilen Frontend Developer Aranıyor",
    applicantName: "Ece Yılmaz",
    applicantEmail: "ece.yilmaz@ogrenci.edu.tr",
    category: "Web Development",
    status: "Kabul Edildi",
    appliedAt: "2026-05-14",
    message:
      "Frontend tarafında görev almak istiyorum. CSS, React Router ve component yapısı konusunda katkı sağlayabilirim.",
    experience:
      "Web programlama dersinde React tabanlı proje geliştirdim ve GitHub üzerinden ekip çalışması yaptım.",
    availability: "Haftada 7-10 saat",
  },
  {
    id: 3,
    projectId: 2,
    projectTitle: "ML Projem İçin Veri Analizi Yapacak Arkadaş Aranıyor",
    applicantName: "Mert Kaya",
    applicantEmail: "mert.kaya@ogrenci.edu.tr",
    category: "Machine Learning",
    status: "Reddedildi",
    appliedAt: "2026-05-13",
    message:
      "Python ve veri analizi konularına ilgim var. Veri temizleme ve görselleştirme tarafında destek olmak isterim.",
    experience:
      "Pandas ve NumPy ile temel veri analizi çalışmaları yaptım.",
    availability: "Haftada 1-3 saat",
  },
];

function ApplicationsReceived() {
  const [applications, setApplications] = useState(initialApplications);

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === applicationId
          ? { ...application, status: newStatus }
          : application
      )
    );
  };

  const getStatusClassName = (status) => {
    if (status === "Kabul Edildi") {
      return "received-status-accepted";
    }

    if (status === "Reddedildi") {
      return "received-status-rejected";
    }

    return "received-status-pending";
  };

  const totalApplications = applications.length;
  const acceptedCount = applications.filter(
    (application) => application.status === "Kabul Edildi"
  ).length;
  const pendingCount = applications.filter(
    (application) => application.status === "Beklemede"
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

        <section className="received-summary-grid">
          <div className="received-summary-card">
            <strong>{totalApplications}</strong>
            <span>Toplam başvuru</span>
          </div>

          <div className="received-summary-card">
            <strong>{acceptedCount}</strong>
            <span>Kabul edilen</span>
          </div>

          <div className="received-summary-card">
            <strong>{pendingCount}</strong>
            <span>Bekleyen</span>
          </div>
        </section>

        <section className="received-list">
          {applications.map((application) => (
            <article className="received-card" key={application.id}>
              <div className="received-main">
                <div className="received-top">
                  <span className="received-category">
                    {application.category}
                  </span>

                  <span
                    className={`received-status ${getStatusClassName(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <h2>{application.projectTitle}</h2>

                <div className="applicant-box">
                  <div className="applicant-avatar">
                    {application.applicantName.charAt(0)}
                  </div>

                  <div>
                    <strong>{application.applicantName}</strong>
                    <span>{application.applicantEmail}</span>
                  </div>
                </div>

                <div className="received-section">
                  <h3>Başvuru mesajı</h3>
                  <p>{application.message}</p>
                </div>

                <div className="received-section">
                  <h3>İlgili deneyim</h3>
                  <p>{application.experience}</p>
                </div>

                <div className="received-meta-row">
                  <div>
                    <span>Başvuru tarihi</span>
                    <strong>{application.appliedAt}</strong>
                  </div>

                  <div>
                    <span>Haftalık uygunluk</span>
                    <strong>{application.availability}</strong>
                  </div>
                </div>
              </div>

              <aside className="received-actions">
                <Link
                  to={`/projects/${application.projectId}`}
                  className="received-view-button"
                >
                  Projeyi Gör
                </Link>

                <button
                  type="button"
                  className="accept-button"
                  onClick={() =>
                    updateApplicationStatus(application.id, "Kabul Edildi")
                  }
                >
                  Kabul Et
                </button>

                <button
                  type="button"
                  className="reject-button"
                  onClick={() =>
                    updateApplicationStatus(application.id, "Reddedildi")
                  }
                >
                  Reddet
                </button>
              </aside>
            </article>
          ))}
        </section>

        <section className="received-note">
          <h3>Not</h3>
          <p>
            Bu sayfa şu anda mock data ile çalışıyor. Backend entegrasyonu
            eklendiğinde başvuruları kabul etme ve reddetme işlemleri gerçek API
            üzerinden yapılacak.
          </p>
        </section>
      </div>
    </main>
  );
}

export default ApplicationsReceived;