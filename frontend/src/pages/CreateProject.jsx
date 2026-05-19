import { useState } from "react";
import { Link } from "react-router-dom";
import { projectCategories } from "../data/mockProjects";
import "../styles/CreateProject.css";

function CreateProject() {
  const categories = projectCategories.filter((category) => category !== "Tümü");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    requiredSkills: "",
    level: "",
    duration: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (!formData.title.trim()) {
      return "Lütfen proje başlığını girin.";
    }

    if (formData.title.trim().length < 8) {
      return "Proje başlığı en az 8 karakter olmalıdır.";
    }

    if (!formData.category) {
      return "Lütfen bir kategori seçin.";
    }

    if (!formData.requiredSkills.trim()) {
      return "Lütfen gerekli becerileri girin.";
    }

    if (!formData.level) {
      return "Lütfen proje seviyesini seçin.";
    }

    if (!formData.duration.trim()) {
      return "Lütfen tahmini proje süresini girin.";
    }

    if (!formData.description.trim()) {
      return "Lütfen proje açıklamasını girin.";
    }

    if (formData.description.trim().length < 40) {
      return "Proje açıklaması en az 40 karakter olmalıdır.";
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
        "Proje ilanı başarıyla oluşturulmuş gibi görünüyor. Backend entegrasyonu eklendiğinde bu ilan veritabanına kaydedilecek."
      );
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      requiredSkills: "",
      level: "",
      duration: "",
      description: "",
    });

    setErrorMessage("");
    setSuccessMessage("");
  };

  const skillPreview = formData.requiredSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <main className="create-project-page">
      <div className="page-container">
        <Link to="/projects" className="create-back-link">
          ← Proje ilanlarına dön
        </Link>

        <section className="create-project-layout">
          <div className="create-project-form-card">
            <div className="create-form-header">
              <span className="create-badge">Yeni proje ilanı</span>

              <h1>Proje ilanı oluştur</h1>

              <p>
                Proje fikrini paylaş, hangi becerilere ihtiyacın olduğunu belirt
                ve doğru ekip arkadaşlarının sana ulaşmasını kolaylaştır.
              </p>
            </div>

            {errorMessage && (
              <div className="alert alert-error">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="alert alert-success">{successMessage}</div>
            )}

            <form className="create-project-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Proje Başlığı</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Örn: React bilen frontend developer aranıyor"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Kategori</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="level">Seviye</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option value="">Seviye seçin</option>
                    <option value="Başlangıç">Başlangıç</option>
                    <option value="Başlangıç-Orta">Başlangıç-Orta</option>
                    <option value="Orta">Orta</option>
                    <option value="Orta-İleri">Orta-İleri</option>
                    <option value="İleri">İleri</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="requiredSkills">Gerekli Beceriler</label>
                <input
                  id="requiredSkills"
                  name="requiredSkills"
                  type="text"
                  placeholder="Örn: React, JavaScript, CSS"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                />
                <small>Becerileri virgülle ayırarak yazabilirsin.</small>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Tahmini Süre</label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="Örn: 3 hafta, 1 ay, dönem sonuna kadar"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Proje Açıklaması</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Projenin amacını, ihtiyaç duyulan ekip arkadaşını ve beklentilerini açıklayın."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="create-form-actions">
                <button
                  type="submit"
                  className="create-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "İlan oluşturuluyor..." : "İlanı Oluştur"}
                </button>

                <button
                  type="button"
                  className="create-clear-button"
                  onClick={handleReset}
                >
                  Temizle
                </button>
              </div>
            </form>
          </div>

          <aside className="create-project-preview">
            <div className="preview-card">
              <span className="preview-label">Önizleme</span>

              <h2>{formData.title || "Proje başlığı burada görünecek"}</h2>

              <p>
                {formData.description ||
                  "Proje açıklaması yazıldığında burada kısa bir önizleme olarak görünecek."}
              </p>

              <div className="preview-info-list">
                <div>
                  <span>Kategori</span>
                  <strong>{formData.category || "Seçilmedi"}</strong>
                </div>

                <div>
                  <span>Seviye</span>
                  <strong>{formData.level || "Seçilmedi"}</strong>
                </div>

                <div>
                  <span>Süre</span>
                  <strong>{formData.duration || "Belirtilmedi"}</strong>
                </div>
              </div>

              <div className="preview-skills">
                {skillPreview.length > 0 ? (
                  skillPreview.map((skill) => <span key={skill}>{skill}</span>)
                ) : (
                  <span>Beceriler burada görünecek</span>
                )}
              </div>
            </div>

            <div className="create-help-card">
              <h3>İyi bir ilan nasıl olmalı?</h3>

              <ul>
                <li>Projenin amacını kısa ve net anlat.</li>
                <li>Gerekli becerileri açıkça yaz.</li>
                <li>Beklenen süreyi ve seviyeyi belirt.</li>
                <li>Başvuracak kişiden ne beklediğini açıkla.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export default CreateProject;