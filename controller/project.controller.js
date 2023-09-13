var ProjectModel = require("../model/projects.model");
var UserModel = require("../model/users.model");

const ProjectController = {
  create: async (req, res) => {
    // Extract project data from the request body
    var { projectName, projectDescription, createdBy } = req.body;

    let checkIfUserExists;
    try {
      checkIfUserExists = await UserModel.findOne({ _id: createdBy }); // Check if the user exists
    } catch (err) {
      return res.status(400).send("User does not exist");
    }

    if (!checkIfUserExists) {
      return res.status(400).send("User does not exist");
    }

    // Create a new project and save it
    var project = new ProjectModel({
      projectName,
      projectDescription,
      createdBy,
    });

    let ifProjectSaved = await project.save();

    if (!ifProjectSaved) {
      return res.status(500).send("Project not saved, something went wrong");
    }
    return res.status(200).send("Project saved successfully");
  },
  getAllProjects: async (req, res) => {
    // Retrieve all projects that are not marked as deleted
    let allProjects = await ProjectModel.find({ isDeleted: false });
    if (!allProjects) {
      return res.status(500).send("Something went wrong!");
    }
    return res.status(200).send(allProjects);
  },
  getProjectById: async (req, res) => {
    let { projectId } = req.params;
    // Find a project by its ID that is not marked as deleted
    let project = await ProjectModel.findOne({
      _id: projectId,
      isDeleted: false,
    });

    if (!project) {
      return res.status(404).send("Project not found");
    }
    return res.status(200).send(project);
  },
  getProjectByUserId: async (req, res) => {
    let { userId } = req.params;
    let user;
    try {
      user = await UserModel.findOne({ _id: userId }); // Check if the user with the given ID exists
    } catch (err) {
      return res.status(404).send("User does not exist");
    }

    // Find projects where the user is a member and they are not marked as deleted
    let projects = await ProjectModel.find({
      projectMembers: userId,
      isDeleted: false,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).send("Projects not found");
    }
    return res.status(200).send(projects);
  },
  assignProjectToUser: async (req, res) => {
    var { projectId, userId } = req.body;
    let checkIfUserExists;
    let checkIfProjectExists;

    try {
      // Check if the user and project exist
      checkIfUserExists = await UserModel.findOne({ _id: userId });
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
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
  },
};

module.exports = ProjectController;
