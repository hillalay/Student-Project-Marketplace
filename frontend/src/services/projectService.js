import { apiRequest } from "./api";

async function getProjects() {
  return apiRequest("/projects");
}

async function getProjectById(projectId) {
  return apiRequest(`/projects/${projectId}`);
}

async function createProject(projectData) {
  return apiRequest("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  });
}

async function updateProject(projectId, projectData) {
  return apiRequest(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  });
}

async function deleteProject(projectId) {
  return apiRequest(`/projects/${projectId}`, {
    method: "DELETE",
  });
}

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};