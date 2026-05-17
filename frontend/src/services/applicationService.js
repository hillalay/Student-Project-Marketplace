import { apiRequest } from "./api";

async function applyToProject(projectId, message) {
  return apiRequest(`/applications/projects/${projectId}`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

async function getMyApplications() {
  return apiRequest("/applications/my");
}

async function getProjectApplications(projectId) {
  return apiRequest(`/applications/project/${projectId}`);
}

async function updateApplicationStatus(applicationId, status) {
  return apiRequest(`/applications/${applicationId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export {
  applyToProject,
  getMyApplications,
  getProjectApplications,
  updateApplicationStatus,
};