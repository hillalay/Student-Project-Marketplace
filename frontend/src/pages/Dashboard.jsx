import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <main className="page dashboard-page">
      <div className="page-container">
        <section className="dashboard-hero card">
          <div className="hero-content">
            <span className="eyebrow">Student Project Marketplace</span>

            <h1 className="page-title">
              Find the right teammates for your next student project.
            </h1>

            <p className="page-description">
              Share project ideas, search for students with specific skills and
              apply to projects that match your interests.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="primary-button">
                Browse Projects
              </Link>

              <Link to="/projects/create" className="secondary-button">
                Create Project
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="mini-card yellow-card">
              <span>React</span>
              <strong>Frontend teammate needed</strong>
            </div>

            <div className="mini-card pink-card">
              <span>Machine Learning</span>
              <strong>Data analysis partner</strong>
            </div>

            <div className="mini-card green-card">
              <span>Flutter</span>
              <strong>Mobile developer wanted</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <strong>24+</strong>
            <span>Open Projects</span>
          </div>

          <div className="stat-card">
            <strong>12</strong>
            <span>Categories</span>
          </div>

          <div className="stat-card">
            <strong>80+</strong>
            <span>Student Profiles</span>
          </div>
        </section>

        <section className="dashboard-features">
          <div className="feature-card card">
            <h3>Create project posts</h3>
            <p>
              Explain your project idea and list the skills you need from future
              teammates.
            </p>
          </div>

          <div className="feature-card card">
            <h3>Apply to projects</h3>
            <p>
              Students can apply to open projects and introduce themselves with
              a short message.
            </p>
          </div>

          <div className="feature-card card">
            <h3>Manage applications</h3>
            <p>
              Project owners can review incoming applications and accept or
              reject them.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;