import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockProjects } from "../data/mockProjects";
import "./ApplyProject.css";

function ApplyProject() {
  const { id } = useParams();

  const project = mockProjects.find(
    (projectItem) => projectItem.id === Number(id)
  );

  const [formData, setFormData] = useState({
    message: "",
    experience: "",
    availability: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!project) {
    return (
      <main className="apply-project-page">
        <div className="page-container">
          <section className="apply-not-found">
            <h1>Proje bulunamadı</h1>
            <p>Başvuru yapmak istediğin proje ilanı bulunamadı.</p>
            <Link to="/projects">Projelere dön</Link>
          </section>
        </div>
      </main>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    if (!formData.message.trim()) {
      return "Lütfen başvuru mesajınızı yazın.";
    }

    if (formData.message.trim().length < 30) {
      return "Başvuru mesajı en az 30 karakter olmalıdır.";
    }

    if (!formData.experience.trim()) {
      return "Lütfen ilgili deneyiminizi kısaca açıklayın.";
    }

    if (!formData.availability) {
      return "Lütfen projeye ayırabileceğiniz zamanı seçin.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        "Başvurun başarıyla gönderilmiş gibi görünüyor. Backend entegrasyonu eklendiğinde bu başvuru veritabanına kaydedilecek."
      );
    }, 700);
  };

  return (
    <main className="apply-project-page">
      <div className="page-container">
        <Link to={`/projects/${project.id}`} className="apply-back-link">
          ← Proje detayına dön
        </Link>

        <section className="apply-layout">
          <div className="apply-form-card">
            <div className="apply-header">
              <span className="apply-badge">Projeye Başvur</span>

              <h1>Başvuru mesajını hazırla.</h1>

              <p>
                Projeye neden katılmak istediğini, hangi becerilerinle katkı
                sağlayabileceğini ve haftalık uygunluğunu kısaca açıkla.
              </p>
            </div>

            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <form className="apply-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="message">Başvuru Mesajı</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Merhaba, bu projeyle ilgileniyorum çünkü..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">İlgili Deneyim</label>
                <textarea
                  id="experience"
                  name="experience"
                  placeholder="Bu projeyle ilgili bildiğiniz teknolojileri veya daha önce yaptığınız çalışmaları yazın."
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="availability">Haftalık Uygunluk</label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                >
                  <option value="">Uygunluk seçin</option>
                  <option value="Haftada 1-3 saat">Haftada 1-3 saat</option>
                  <option value="Haftada 4-6 saat">Haftada 4-6 saat</option>
                  <option value="Haftada 7-10 saat">Haftada 7-10 saat</option>
                  <option value="Haftada 10+ saat">Haftada 10+ saat</option>
                </select>
              </div>

              <button
                type="submit"
                className="apply-submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Başvuru gönderiliyor..." : "Başvuruyu Gönder"}
              </button>
            </form>
          </div>

          <aside className="apply-project-summary">
            <div className="apply-summary-card">
              <span className="summary-label">Başvurulan Proje</span>

              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <div className="summary-info-list">
                <div>
                  <span>Kategori</span>
                  <strong>{project.category}</strong>
                </div>

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
              </div>

              <div className="summary-skills">
                {project.requiredSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className="apply-help-card">
              <h3>İyi bir başvuru nasıl olur?</h3>
              <ul>
                <li>Neden bu projeye katılmak istediğini açıkla.</li>
                <li>Projeye hangi becerilerle katkı sağlayacağını yaz.</li>
                <li>Haftalık ne kadar zaman ayırabileceğini belirt.</li>
                <li>Kısa, net ve saygılı bir mesaj kullan.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default ApplyProject;