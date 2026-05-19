import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { mockProjects, projectCategories } from "../data/mockProjects";
import "../styles/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();

        const formattedProjects = Array.isArray(data)
          ? data.map((project) => ({
              ...project,
              category: project.category_name || "Genel",
              owner: project.owner_name || "Bilinmeyen Kullanıcı",
              requiredSkills: project.required_skills
                ? project.required_skills
                    .split(",")
                    .map((skill) => skill.trim())
                : [],
            }))
          : [];

        setProjects(formattedProjects);
      } catch (error) {
        setErrorMessage(error.message || "Projeler yüklenirken hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const projectCategories = useMemo(() => {
    const categories = projects
      .map((project) => project.category)
      .filter(Boolean);

    return ["Tümü", ...new Set(categories)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "Tümü" || project.category === selectedCategory;

      const searchValue = searchTerm.toLowerCase().trim();

      const matchesSearch =
        project.title.toLowerCase().includes(searchValue) ||
        project.description.toLowerCase().includes(searchValue) ||
        project.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchValue),
        ) ||
        project.owner.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  return (
    <main className="projects-page">
      <div className="page-container">
        <section className="projects-header">
          <div>
            <span className="projects-badge">Proje İlanları</span>

            <h1>Aktif öğrenci projelerini keşfet.</h1>

            <p>
              İlgi alanına ve becerilerine uygun projeleri incele, ekiplere
              katılmak için başvuru yap.
            </p>
          </div>

          <Link to="/projects/create" className="create-project-link">
            Proje İlanı Oluştur
          </Link>
        </section>

        <section className="projects-toolbar">
          <div className="search-box">
            <label htmlFor="projectSearch">Proje ara</label>
            <input
              id="projectSearch"
              type="text"
              placeholder="React, Flutter, ML, veri analizi..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <div className="category-box">
            <span>Kategori filtrele</span>

            <div className="category-list">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    selectedCategory === category ? "category-active" : ""
                  }
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="alert alert-error">{errorMessage}</div>
        )}

        <section className="projects-summary">
          <div>
            <strong>{isLoading ? "..." : filteredProjects.length}</strong>
            <span>proje listeleniyor</span>
          </div>

          <p>
            Seçili kategori: <strong>{selectedCategory}</strong>
          </p>
        </section>

        {isLoading ? (
          <section className="empty-projects">
            <h2>Projeler yükleniyor...</h2>
            <p>Backend’den proje ilanları getiriliyor.</p>
          </section>
        ) : filteredProjects.length > 0 ? (
          <section className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <section className="empty-projects">
            <h2>Sonuç bulunamadı</h2>
            <p>
              Arama kelimesini veya kategori filtresini değiştirerek tekrar
              deneyebilirsin.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Tümü");
                setSearchTerm("");
              }}
            >
              Filtreleri temizle
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

export default Projects;
