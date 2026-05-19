import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../services/projectService";
import { getUser } from "../services/authService";
import { categoryOptions, getCategoryIdByName } from "../data/categories";
import "../styles/CreateProject.css";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getUser();

  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    requiredSkills: "",
    description: "",
    status: "open",
  });
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);

        setProject(data);
        setFormData({
          title: data.title || "",
          categoryId: data.category_id || getCategoryIdByName(data.category_name),
          requiredSkills: data.required_skills || "",
          description: data.description || "",
          status: data.status || "open",
        });
      } catch (error) {
        setErrorMessage(error.message || "Proje bilgileri yüklenirken hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  const isOwner = project && currentUser && currentUser.id === project.owner_id;

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

    if (!formData.categoryId) {
      return "Lütfen bir kategori seçin.";
    }

    if (!formData.description.trim()) {
      return "Lütfen proje açıklamasını girin.";
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

    try {
      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      await updateProject(id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        required_skills: formData.requiredSkills.trim(),
        category_id: Number(formData.categoryId),
        status: formData.status,
      });

      setSuccessMessage("Proje başarıyla güncellendi.");
      setTimeout(() => {
        navigate("/my-projects");
      }, 500);
    } catch (error) {
      setErrorMessage(error.message || "Proje güncellenirken hata oluştu.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="create-project-page">
        <div className="page-container">
          <section className="create-project-form-card">
            <h1>Proje yükleniyor...</h1>
            <p>Backend'den proje bilgileri getiriliyor.</p>
          </section>
        </div>
      </main>
    );
  }

  if (!project || !isOwner) {
    return (
      <main className="create-project-page">
        <div className="page-container">
          <section className="create-project-form-card">
            <h1>Bu projeyi düzenleyemezsin</h1>
            <p>Yalnızca proje sahibi kendi ilanını güncelleyebilir.</p>
            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
            <Link to="/my-projects" className="create-back-link">
              Benim Projelerim'e dön
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const selectedCategoryName =
    categoryOptions.find((category) => String(category.id) === String(formData.categoryId))
      ?.name || "Seçilmedi";

  const skillPreview = formData.requiredSkills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  return (
    <main className="create-project-page">
      <div className="page-container">
        <Link to="/my-projects" className="create-back-link">
          ← Benim Projelerim'e dön
        </Link>

        <section className="create-project-layout">
          <div className="create-project-form-card">
            <div className="create-form-header">
              <span className="create-badge">Proje düzenle</span>
              <h1>İlan bilgilerini güncelle</h1>
              <p>
                Başlık, açıklama, kategori ve beceri bilgilerini güncel tutarak
                doğru ekip arkadaşlarının sana ulaşmasını kolaylaştır.
              </p>
            </div>

            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
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
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="categoryId">Kategori</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">Kategori seçin</option>
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Durum</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="requiredSkills">Gerekli Beceriler</label>
                <input
                  id="requiredSkills"
                  name="requiredSkills"
                  type="text"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                />
                <small>Becerileri virgülle ayırarak yazabilirsin.</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Proje Açıklaması</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="create-form-actions">
                <button
                  type="submit"
                  className="create-submit-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </form>
          </div>

          <aside className="create-project-preview">
            <div className="preview-card">
              <span className="preview-label">Önizleme</span>
              <h2>{formData.title || "Proje başlığı"}</h2>
              <p>{formData.description || "Proje açıklaması"}</p>

              <div className="preview-info-list">
                <div>
                  <span>Kategori</span>
                  <strong>{selectedCategoryName}</strong>
                </div>

                <div>
                  <span>Durum</span>
                  <strong>{formData.status}</strong>
                </div>
              </div>

              <div className="preview-skills">
                {skillPreview.length > 0 ? (
                  skillPreview.map((skill) => <span key={skill}>{skill}</span>)
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

export default EditProject;
