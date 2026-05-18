import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import { applyToProject } from "../services/applicationService";
import { getUser } from "../services/authService";
import "../styles/ApplyProject.css";

function ApplyProject() {
  const { id } = useParams();
  const currentUser = getUser();

  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
    experience: "",
    availability: "",
  });
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);
        setProject({
          ...data,
          category: data.category_name || "Genel",
          owner: data.owner_name || "Bilinmeyen Kullanıcı",
          requiredSkills: data.required_skills
            ? data.required_skills.split(",").map((skill) => skill.trim())
            : [],
        });
      } catch (error) {
        setErrorMessage(error.message || "Proje bilgileri yüklenirken hata oluştu.");
      } finally {
        setIsProjectLoading(false);
      }
    }

    fetchProject();
  }, [id]);

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

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const finalMessage = [
      formData.message.trim(),
      formData.experience.trim()
        ? `İlgili deneyim: ${formData.experience.trim()}`
        : "",
      formData.availability ? `Haftalık uygunluk: ${formData.availability}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await applyToProject(id, finalMessage);
      setSuccessMessage("Başvurun başarıyla gönderildi.");
    } catch (error) {
      setErrorMessage(error.message || "Başvuru gönderilirken hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isProjectLoading) {
    return (
      <main className="apply-project-page">
        <div className="page-container">
          <section className="apply-not-found">
            <h1>Proje yükleniyor...</h1>
            <p>Backend'den proje bilgileri getiriliyor.</p>
          </section>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="apply-project-page">
        <div className="page-container">
          <section className="apply-not-found">
            <h1>Proje bulunamadı</h1>
            <p>Başvuru yapmak istediğin proje ilanı bulunamadı.</p>
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
            <Link to="/projects">Projelere dön</Link>
          </section>
        </div>
      </main>
    );
  }

  const isOwner = currentUser && currentUser.id === project.owner_id;

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
                Projeye neden katılmak istediğini ve hangi becerilerinle katkı
                sağlayabileceğini kısaca açıkla.
              </p>
            </div>

            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            {isOwner ? (
              <div className="alert alert-error">
                Kendi projenize başvuru yapamazsınız.
              </div>
            ) : (
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
            )}
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
              </div>

              <div className="summary-skills">
                {project.requiredSkills.length > 0 ? (
                  project.requiredSkills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))
                ) : (
                  <span>Beceri belirtilmemiş</span>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default ApplyProject;
