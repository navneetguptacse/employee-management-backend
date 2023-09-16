var express = require("express");
var router = express.Router();
var projectController = require("../controller/project.controller");
var authenticationMiddleware = require("../middleware/authentication.middleware");

// Create a new project
router.post(
  "/create",
  authenticationMiddleware.authenticate,
  projectController.create
);

// Fetch all projects
router.get(
  "/getAllProjects",
  authenticationMiddleware.authenticate,
  projectController.getAllProjects
);

// Get project by projectID
router.get(
  "/getProjectById/:projectId",
  authenticationMiddleware.authenticate,
  projectController.getProjectById
);

// Get projects by user ID
router.get(
  "/getProjectByUserId/:userId",
  authenticationMiddleware.authenticate,
  projectController.getProjectByUserId
);

// Assign projects to Users
router.post(
  "/assignProjectToUser",
  authenticationMiddleware.authenticate,
  projectController.assignProjectToUser
);

// Update project by projectID
router.put(
  "/updateProjectById/:projectId",
  authenticationMiddleware.authenticate,
  projectController.updateProjectById
);

// Delete project by projectID
router.delete(
  "/deleteProjectById/:projectId",
  authenticationMiddleware.authenticate,
  projectController.deleteProjectById
);

// Get project by User ID
router.get(
  "/getProjectByUserId/:userId",
  authenticationMiddleware.authenticate,
  projectController.getProjectByUserId
);

module.exports = router;
