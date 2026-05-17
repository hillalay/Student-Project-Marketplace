const express = require("express");
const router = express.Router();

const {
  listProjects,
  getProject,
  createNewProject,
  editProject,
  removeProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", listProjects);
router.get("/:id", getProject);

// Protected routes
router.post("/", authMiddleware, createNewProject);
router.put("/:id", authMiddleware, editProject);
router.delete("/:id", authMiddleware, removeProject);

module.exports = router;