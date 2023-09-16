var ProjectModel = require("../model/projects.model");
var UserModel = require("../model/users.model");

const ProjectController = {
  create: async (req, res) => {
    var { projectName, projectDescription, createdBy } = req.body;

    let checkIfUserExists;
    try {
      checkIfUserExists = await UserModel.findOne({ _id: createdBy });
    } catch (err) {
      return res.status(400).send("User does not exist");
    }

    if (!checkIfUserExists) {
      return res.status(400).send("User does not exist");
    }

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
    let allProjects = await ProjectModel.find({ isDeleted: false });
    if (!allProjects) {
      return res.status(500).send("Something went wrong!");
    }
    return res.status(200).send(allProjects);
  },
  getProjectById: async (req, res) => {
    let { projectId } = req.params;
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
      user = await UserModel.findOne({ _id: userId });
    } catch (err) {
      return res.status(404).send("User does not exist");
    }

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
      checkIfUserExists = await UserModel.findOne({ _id: userId });
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
    } catch (err) {
      return res.status(404).send("User and project not found");
    }

    if (checkIfProjectExists.projectMembers.includes(userId)) {
      return res.status(409).send("User already assigned to this project");
    }

    checkIfProjectExists.projectMembers.push(userId);
    checkIfUserExists.projects.push(projectId);

    let ifProjectSaved = await checkIfProjectExists.save();
    let ifUserSaved = await checkIfUserExists.save();

    if (!ifProjectSaved || !ifUserSaved) {
      return res.status(500).send("Something went wrong");
    }
    return res.status(200).send("Project assigned successfully");
  },
  updateProjectById: async (req, res) => {
    // Update a project by its ID
    var { projectId } = req.params;
    var { projectName, projectDescription } = req.body;

    let checkIfProjectExists;
    try {
      checkIfProjectExists = await ProjectModel.findOne({ _id: projectId });
    } catch (err) {
      return res.status(400).send("Project does not exists");
    }
    if (!checkIfProjectExists) {
      return res.status(400).send("Project does not exists");
    }

    let updateProject = await ProjectModel.updateOne(
      { _id: projectId },
      {
        projectName,
        projectDescription,
        updatedAt: new Date(),
      }
    );
    if (!updateProject) {
      return res.status(500).send("Project not updated something went wrong");
    }
    return res.status(200).send("Project updated successfully");
  },
  deleteProjectById: async (req, res) => {
    // Delete a project by its ID
    const { projectId } = req.params;

    try {
      const project = await ProjectModel.findOne({ _id: projectId });
      if (!project) {
        return res.status(404).send("Project not found");
      }
      project.isDeleted = true;
      await project.save();

      return res.status(200).send("Project deleted successfully");
    } catch (error) {
      return res.status(500).send("Something went wrong");
    }
  },
  getProjectByUserId: async (req, res) => {
    // Get projects by user ID
    let { userId } = req.params;
    let user;
    try {
      user = await UserModel.findOne({ _id: userId });
    } catch (err) {
      return res.status(404).send("User does not exist");
    }

    let projects = await ProjectModel.find({
      projectMembers: userId,
      isDeleted: false,
    });

    if (!projects || projects.length === 0) {
      return res.status(404).send("Projects not found");
    }
    return res.status(200).send(projects);
  },
};

module.exports = ProjectController;
