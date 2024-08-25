import { editProjetParser, newUserParser, projectParser } from "../Config/Type.js";
import { z } from "zod";
import { ErrorHandler } from "../Middlewares/ErrorHandler.js";
import Project from "../Models/Project.js";
import User from "../Models/User.js";
import nodemailer from 'nodemailer'
import mongoose from "mongoose";

export const getProjects = async (req, res, next) => {
    const userId = req.user.id

    if(!userId) return next(new ErrorHandler("User not authenticated!", 400))

    const project = await User.findById(userId).populate('projects.projectId')

    res.status(200).json({
        project: project.projects
    })
};

export const createProject = async (req, res, next) => {
  const bodyParser = req.body;

  const parsedBody = projectParser.safeParse(bodyParser);

  if (parsedBody.error) {
    console.log(parsedBody.error);
    return next(new ErrorHandler("Enter the data correctly", 400));
  }

  const newProject = await Project.create({
    title: parsedBody.data.title,
    description: parsedBody.data.description,
    deadline: parsedBody.data.deadline,
    users: {
      id: parsedBody.data.users.id,
      role: parsedBody.data.users.role,
    },
    tasks: parsedBody.data.tasks,
    status: 'Todo',
    startDate: parsedBody.data.startDate
  });
  
  if (newProject) {
    const updateUser = await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $push: {
            projects: {
              projectId: newProject._id,
              role: "Product Manager",
            },
        }
      },
      {new: true}
    );
    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: "Project Created Successfully!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Something went wrong! Try Again Later!",
    });
  }
};

export const addUser = async (req, res, next) => {
  const projectId = req.params.projectId;
  const bodyParser = req.body;
  const parsedBody = newUserParser.safeParse(bodyParser);

  if (parsedBody.error) return next(new ErrorHandler("Fill all the data properly!", 400));

  const ifExists = await User.findOne({email: parsedBody.data.email})

  if(ifExists) {
    const userUpdate = await User.findOneAndUpdate({
        email: parsedBody.data.email
    }, {
        $push: {
            projects: {
                projectId,
                role: parsedBody.data.role
            }
        }
    })
    if(userUpdate) {
        const projectTable = await Project.findOneAndUpdate({
            _id: projectId
        }, {
            $push: {
                users: {
                    id: ifExists._id,
                    role: parsedBody.data.role
                }
            }
        }, { new: true })

        if(projectTable) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.USER_PASS
                }
            })

            const mailOption = {
                from: process.env.USER_MAIL,
                to: parsedBody.data.email,
                subject: `Invitation to join project: ${projectTable.title}`,
                html: `You have been invited to join the project: ${projectTable.title}. Please log in to accept the invitation`
            }

            try {
                await transporter.sendMail(mailOption)
                return res.status(200).json({
                    success: true,
                    message: "Invitation email sent to the user!"
                })
            } catch (error) {
                next(new ErrorHandler("Error sending email" + error, 400))
            }
        } else {
            next(new ErrorHandler("Something went wront!",400))
        }
    } else {
        next(new ErrorHandler("Something went wront!",400))
    }
  } else {
    const user = await User.create({
        name: parsedBody.data.name,
        email: parsedBody.data.email,
        password: parsedBody.data.name,
        role: 'Admin',
        projects: {
            projectId,
            role: parsedBody.data.role
        }
    })
    if(user) {
        const projectTable = await Project.findOneAndUpdate({
            _id: projectId
        }, {
            $push: {
                users: {
                    id: user._id,
                    role: parsedBody.data.role
                }
            }
        }, {new: true})
        if(projectTable) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.USER_PASS
                }
            })

            const mailOption = {
                from: process.env.USER_MAIL,
                to: parsedBody.data.email,
                subject: `Invitation to join project: ${projectTable.title}`,
                html: `You have been invited to join the project: ${projectTable.title}. Please log in to accept the invitation: <br><br>Here is your credentials to login in to the system: <br> <b>Email: </b>${parsedBody.data.email}<br><b>Password: </b>${parsedBody.data.name}`
            }

            try {
                await transporter.sendMail(mailOption)
                return res.status(200).json({
                    success: true,
                    message: "Invitation email sent to the user!"
                })
            } catch (error) {
                next(new ErrorHandler("Error sending email" + error, 400))
            }
        } else {
            next(new ErrorHandler("Something went wront!",400))
        }
    } else {
        next(new ErrorHandler("Something went wront!",400))
    }
  }
};

export const deleteUser = async (req,res,next) => {
    const projectId = req.params.projectId
    const userId = req.params.userId

    const projectDetails = await Project.findById(projectId)

    if(!projectDetails) return next(new ErrorHandler("Project not found!",400))
    
    const deleteUserFromProject = await Project.findOneAndUpdate({ _id: projectId}, {
        $pull: {
            users: {
                id: userId
            }
        }
    }, { new: true})

    if(deleteUserFromProject) { 
        const deleteProjectFromUser = await User.findOneAndUpdate({ _id: userId}, {
            $pull: {
                projects: {
                    projectId
                }
            }
        })
        if(deleteProjectFromUser) {
            res.status(200).json({
                success: true,
                message: "User deleted from the user!"
            })
        } else {
            return next(new ErrorHandler("Something went wrong!", 400))
        }
    } else {
        return next(new ErrorHandler("Something went wrong!", 400))
    }
}

export const editProject = async (req,res,next) => {
    const projectId = req.params.projectId
    const bodyParser = req.body
    const parsedBody = editProjetParser.safeParse(bodyParser)

    if(parsedBody.error) return next(new ErrorHandler("Fill all the data properly!", 400))

    const updateProject = await Project.findOneAndUpdate({_id: projectId}, {
        title: parsedBody.data.title,
        description: parsedBody.data.description,
        deadline: parsedBody.data.deadline
    })

    if(updateProject) {
        return res.status(200).json({
            success: true,
            message: "Project Updated Successfully!"
        })
    } else { 
        return next(new ErrorHandler("Something went wrong!",400))
    }
}

export const getProjectDetail = async(req,res,next) => {
    const projectId = req.params.projectId
    if(!projectId) return next(new ErrorHandler("Project Id not found",400))

    const projectDetails = await Project.find({_id: projectId}).populate('tasks.id users.id')

    if(!projectDetails) return next(new ErrorHandler("Project Not found",400))

    res.status(200).json({
        projectDetails
    })
}

export const getAllUsers = async(req,res,next) => {
    const projectId = req.params.projectId
    if(!projectId) return next(new ErrorHandler("Project Id not found!")) 

    const allUsers = await Project.findById(projectId).populate('users.id')

    if(!allUsers) return next(new ErrorHandler("Project not found!"))

    return res.status(200).json({
        users: allUsers.users
    })
}

export const getUsersRole = async(req,res,next) => {
    try {
        const userId = req.user.id; // User ID from authentication middleware
        const project = await Project.findOne({ 'users.id': userId }, { 'users.$': 1 }); // Assuming 'members' is an array in your project schema
    
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
    
        const member = project.users.find(member => member.id.toString() === userId);
        if (!member) {
          return res.status(404).json({ message: 'User not found in project' });
        }
    
        res.json({ role: member.role });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
} 