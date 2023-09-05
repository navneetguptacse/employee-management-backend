var express = require('express');
var router = express.Router();

var Project = require('../model/projects.model');
const UserModel = require('../model/users.model');

// Create a new project
router.post('/create', async (req, res) => {
    // Extract project data from the request body
    var { projectName, projectDescription, createdBy } = req.body;

    let checkIfUserExists;
    try {
        checkIfUserExists = await UserModel.findOne({ _id: createdBy });  // Check if the user exists
    } catch (err) {
        return res.status(404).send("User does not exist");
    }

    if (!checkIfUserExists) {
        return res.status(400).send("User does not exist");
    }

    // Create a new project and save it
    var project = new Project({
        projectName,
        projectDescription,
        createdBy
    });

    let ifProjectSaved = await project.save();

    if (!ifProjectSaved) {
        return res.status(500).send("Project not saved, something went wrong");
    }
    return res.status(200).send("Project saved successfully");
});


// Fetch all projects
router.get('/getAllProjects', async (req, res) => {
    // Retrieve all projects that are not marked as deleted
    let allProjects = await Project.find({ isDeleted: false });
    if (!allProjects) {
        return res.status(500).send("Something went wrong!");
    }
    return res.status(200).send(allProjects);
});


// Get project by projectID
router.get('/getProjectById/:projectId', async (req, res) => {
    let { projectId } = req.params;
    // Find a project by its ID that is not marked as deleted
    let project = await Project.findOne({ _id: projectId, isDeleted: false });

    if (!project) {
        return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
});


// Get projects by user ID
router.get('/getProjectByUserId/:userId', async (req, res) => {
    let { userId } = req.params;

    // Check if the user with the given ID exists
    let user;
    
    try {
        user = await UserModel.findOne({ _id: userId });
    } catch (err) {
        return res.status(404).send("User does not exist");
    }

    // Find projects where the user is a member and they are not marked as deleted
    let projects = await Project.find({ projectMembers: userId, isDeleted: false });

    if (!projects || projects.length === 0) {
        return res.status(404).send("Projects not found");
    }
    return res.status(200).send(projects);
});


// Assign projects to Users
router.post('/assignProjectToUser', async (req, res) => {
    var { projectId, userId } = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;

    try {
        // Check if the user and project exist
        checkIfUserExists = await UserModel.findOne({ _id: userId });
        checkIfProjectExists = await Project.findOne({ _id: projectId });
    } catch (err) {
        return res.status(404).send("User and project not found");
    }

    if (checkIfProjectExists.projectMembers.includes(userId)) {
        return res.status(409).send("User already assigned to this project");
    }

    // Update project members and user's projects
    checkIfProjectExists.projectMembers.push(userId);
    checkIfUserExists.projects.push(projectId);

    let ifProjectSaved = await checkIfProjectExists.save();
    let ifUserSaved = await checkIfUserExists.save();

    if (!ifProjectSaved || !ifUserSaved) {
        return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Project assigned successfully");
});

module.exports = router;
