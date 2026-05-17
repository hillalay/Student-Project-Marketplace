const {
  getProjectById,
  getApplicationByProjectAndApplicant,
  createApplication,
  getMyApplications,
  getApplicationsByProject,
  getApplicationById,
  updateApplicationStatus,
} = require("../models/applicationModel");

// POST /api/applications/projects/:projectId
const applyToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;

    const applicantId = req.user.id;

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner_id === applicantId) {
      return res.status(400).json({
        message: "You cannot apply to your own project",
      });
    }

    const existingApplication = await getApplicationByProjectAndApplicant(
      projectId,
      applicantId
    );

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied to this project",
      });
    }

    const application = await createApplication({
      projectId,
      applicantId,
      message,
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply to project error:", error);

    return res.status(500).json({
      message: "Server error while applying to project",
    });
  }
};

// GET /api/applications/my
const listMyApplications = async (req, res) => {
  try {
    const applicantId = req.user.id;

    const applications = await getMyApplications(applicantId);

    return res.status(200).json(applications);
  } catch (error) {
    console.error("List my applications error:", error);

    return res.status(500).json({
      message: "Server error while listing your applications",
    });
  }
};

// GET /api/applications/project/:projectId
const listProjectApplications = async (req, res) => {
  try {
    const { projectId } = req.params;
    const ownerId = req.user.id;

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.owner_id !== ownerId) {
      return res.status(403).json({
        message: "You are not allowed to view applications for this project",
      });
    }

    const applications = await getApplicationsByProject(projectId, ownerId);

    return res.status(200).json(applications);
  } catch (error) {
    console.error("List project applications error:", error);

    return res.status(500).json({
      message: "Server error while listing project applications",
    });
  }
};

// PATCH /api/applications/:id/status
const changeApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ownerId = req.user.id;

    const allowedStatuses = ["accepted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status must be either accepted or rejected",
      });
    }

    const application = await getApplicationById(id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.owner_id !== ownerId) {
      return res.status(403).json({
        message: "You are not allowed to update this application",
      });
    }

    const updatedApplication = await updateApplicationStatus(
      id,
      ownerId,
      status
    );

    return res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Change application status error:", error);

    return res.status(500).json({
      message: "Server error while updating application status",
    });
  }
};

module.exports = {
  applyToProject,
  listMyApplications,
  listProjectApplications,
  changeApplicationStatus,
};