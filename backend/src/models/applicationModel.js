const { pool } = require("../config/db");

// Bir projeyi id ile bulur.
// Başvuru yaparken veya proje sahibini kontrol ederken kullanacağız.
const getProjectById = async (projectId) => {
  const result = await pool.query(
    "SELECT * FROM projects WHERE id = $1",
    [projectId]
  );

  return result.rows[0];
};

// Kullanıcı daha önce bu projeye başvurmuş mu kontrol eder.
const getApplicationByProjectAndApplicant = async (projectId, applicantId) => {
  const result = await pool.query(
    "SELECT * FROM applications WHERE project_id = $1 AND applicant_id = $2",
    [projectId, applicantId]
  );

  return result.rows[0];
};

// Yeni başvuru oluşturur.
const createApplication = async ({ projectId, applicantId, message }) => {
  const result = await pool.query(
    `
    INSERT INTO applications (project_id, applicant_id, message)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [projectId, applicantId, message || null]
  );

  return result.rows[0];
};

// Login olmuş kullanıcının kendi yaptığı başvuruları listeler.
const getMyApplications = async (applicantId) => {
  const result = await pool.query(
    `
    SELECT 
      applications.id,
      applications.project_id,
      applications.applicant_id,
      applications.message,
      applications.status,
      applications.created_at,
      projects.title AS project_title,
      projects.description AS project_description,
      projects.required_skills,
      categories.name AS category_name,
      users.name AS owner_name,
      users.email AS owner_email
    FROM applications
    JOIN projects ON applications.project_id = projects.id
    LEFT JOIN categories ON projects.category_id = categories.id
    JOIN users ON projects.owner_id = users.id
    WHERE applications.applicant_id = $1
    ORDER BY applications.created_at DESC
    `,
    [applicantId]
  );

  return result.rows;
};

// Bir projenin başvurularını listeler.
// Sadece proje sahibinin görmesi için ownerId kontrolü ekliyoruz.
const getApplicationsByProject = async (projectId, ownerId) => {
  const result = await pool.query(
    `
    SELECT 
      applications.id,
      applications.project_id,
      applications.applicant_id,
      applications.message,
      applications.status,
      applications.created_at,
      users.name AS applicant_name,
      users.email AS applicant_email
    FROM applications
    JOIN projects ON applications.project_id = projects.id
    JOIN users ON applications.applicant_id = users.id
    WHERE applications.project_id = $1
      AND projects.owner_id = $2
    ORDER BY applications.created_at DESC
    `,
    [projectId, ownerId]
  );

  return result.rows;
};

// Başvuruyu id ile bulur.
// Status güncellerken başvuru var mı diye kontrol edeceğiz.
const getApplicationById = async (applicationId) => {
  const result = await pool.query(
    `
    SELECT 
      applications.*,
      projects.owner_id
    FROM applications
    JOIN projects ON applications.project_id = projects.id
    WHERE applications.id = $1
    `,
    [applicationId]
  );

  return result.rows[0];
};

// Başvuru status değerini günceller.
// Sadece proje sahibinin güncellemesi için ownerId kontrolü var.
const updateApplicationStatus = async (applicationId, ownerId, status) => {
  const result = await pool.query(
    `
    UPDATE applications
    SET status = $1
    FROM projects
    WHERE applications.project_id = projects.id
      AND applications.id = $2
      AND projects.owner_id = $3
    RETURNING applications.*
    `,
    [status, applicationId, ownerId]
  );

  return result.rows[0];
};

module.exports = {
  getProjectById,
  getApplicationByProjectAndApplicant,
  createApplication,
  getMyApplications,
  getApplicationsByProject,
  getApplicationById,
  updateApplicationStatus,
};