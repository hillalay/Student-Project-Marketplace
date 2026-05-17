const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../models/projectModel");
//database ile konuşan fonks alır 

async function listProjects(req, res) {
  try {
    const projects = await getAllProjects();
    return res.json(projects);
  } catch (error) {
    console.error("List projects error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProject(req, res) {
  try {
    const { id } = req.params;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createNewProject(req, res) {
  try {
    const { title, description, required_skills, category_id } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required" });
    }

    const project = await createProject({
      title,
      description,
      required_skills,
      category_id,
      owner_id: req.user.id, //projeyi oluşturan kullanıcı id'si, tokendakı  login olmuş kullanıcıdır 
    });

    return res.status(201).json({
      message: "Project created",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function editProject(req, res) {
  try {
    const { id } = req.params;
    const { title, description, required_skills, category_id, status } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required" });
    }

    const project = await updateProject(id, req.user.id, {
      title,
      description,
      required_skills,
      category_id,
      status,
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or you are not the owner",
      });
    }

    return res.json({
      message: "Project updated",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function removeProject(req, res) {
  try {
    const { id } = req.params;

    const project = await deleteProject(id, req.user.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found or you are not the owner",
      });
    }

    return res.json({
      message: "Project deleted",
      project,
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  listProjects,
  getProject,
  createNewProject,
  editProject,
  removeProject,
};