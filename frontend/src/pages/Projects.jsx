import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { mockProjects, projectCategories } from "../data/mockProjects";
import "./Projects.css";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "Tümü" || project.category === selectedCategory;

      const searchValue = searchTerm.toLowerCase().trim();

      const matchesSearch =
        project.title.toLowerCase().includes(searchValue) ||
        project.description.toLowerCase().includes(searchValue) ||
        project.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(searchValue)
        ) ||
        project.owner.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

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

        <section className="projects-summary">
          <div>
            <strong>{filteredProjects.length}</strong>
            <span>proje listeleniyor</span>
          </div>

          <p>
            Seçili kategori: <strong>{selectedCategory}</strong>
          </p>
        </section>

        {filteredProjects.length > 0 ? (
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