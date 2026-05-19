const { pool } = require("../config/db");

async function getAllProjects() {
  const result = await pool.query(`
    SELECT 
      p.id,
      p.title,
      p.description,
      p.required_skills,
      p.status,
      p.created_at,
      p.updated_at,
      c.name AS category_name,
      u.id AS owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      COUNT(a.id)::int AS application_count
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    JOIN users u ON p.owner_id = u.id
    LEFT JOIN applications a ON a.project_id = p.id
    GROUP BY p.id, c.name, u.id, u.name, u.email
    ORDER BY p.created_at DESC
  `);

  return result.rows;
}

async function getProjectById(id) {
  const result = await pool.query(
    `
    SELECT 
      p.id,
      p.title,
      p.description,
      p.required_skills,
      p.category_id,
      p.status,
      p.created_at,
      p.updated_at,
      c.name AS category_name,
      u.id AS owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      COUNT(a.id)::int AS application_count
    FROM projects p
    LEFT JOIN categories c ON p.category_id = c.id
    JOIN users u ON p.owner_id = u.id
    LEFT JOIN applications a ON a.project_id = p.id
    WHERE p.id = $1
    GROUP BY p.id, c.name, u.id, u.name, u.email
    `,
    [id]
  );

  return result.rows[0] || null;
}

async function createProject({
  title,
  description,
  required_skills,
  category_id,
  owner_id,
}) {
  const result = await pool.query(
    `
    INSERT INTO projects 
      (title, description, required_skills, category_id, owner_id)
    VALUES 
      ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [title, description, required_skills, category_id || null, owner_id]
  );

  return result.rows[0];
}

async function updateProject(id, owner_id, {
  title,
  description,
  required_skills,
  category_id,
  status,
}) {
  const result = await pool.query(
    `
    UPDATE projects
    SET 
      title = $1,
      description = $2,
      required_skills = $3,
      category_id = $4,
      status = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $6 AND owner_id = $7
    RETURNING *
    `,
    [
      title,
      description,
      required_skills,
      category_id || null,
      status || "open",
      id,
      owner_id,
    ]
  );

  return result.rows[0] || null;
}

async function deleteProject(id, owner_id) {
  const result = await pool.query(
    `
    DELETE FROM projects
    WHERE id = $1 AND owner_id = $2
    RETURNING *
    `,
    [id, owner_id]
  );

  return result.rows[0] || null;
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
