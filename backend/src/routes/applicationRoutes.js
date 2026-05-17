const express = require("express");

const {
  applyToProject,
  listMyApplications,
  listProjectApplications,
  changeApplicationStatus,
} = require("../controllers/applicationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Login olmuş kullanıcı bir projeye başvurur
// POST /api/applications/projects/:projectId
router.post("/projects/:projectId", authMiddleware, applyToProject);

// Login olmuş kullanıcı kendi yaptığı başvuruları görür
// GET /api/applications/my
router.get("/my", authMiddleware, listMyApplications);

// Proje sahibi kendi projesine gelen başvuruları görür
// GET /api/applications/project/:projectId
router.get("/project/:projectId", authMiddleware, listProjectApplications);

// Proje sahibi başvuruyu accepted/rejected yapar
// PATCH /api/applications/:id/status
router.patch("/:id/status", authMiddleware, changeApplicationStatus);

module.exports = router;