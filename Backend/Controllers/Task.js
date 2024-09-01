import { taskParser } from "../Config/Type.js"
import ErrorHandler from "../Middlewares/ErrorHandler.js"
import Project from "../Models/Project.js"
import Task from "../Models/Task.js"

export const getTasks = async (req,res,next)=>{
    const projectId = req.params.projectId

    const tasks = await Task.find({
        projectId: projectId
    }).populate('assignedTo')

    return res.status(200).json({
        tasks
    })
}

export const getTasksOfUser = async(req,res,next)=>{
    const tasks = await Task.find({
        assignedTo: req.user.id
    })

    return res.status(200).json({
        tasks: tasks
    })
}

export const addTasks = async(req,res,next) => {
    const body = req.body

    const parsedBody = taskParser.safeParse(body)

    if(parsedBody.error) return next(new ErrorHandler("Enter the data correctly!", 400))

    const createTask = await Task.create({
        title: parsedBody.data.title,
        description: parsedBody.data.description,
        status: parsedBody.data.status,
        deadline: parsedBody.data.deadline,
        assignedTo: parsedBody.data.assignedTo,
        projectId: parsedBody.data.projectId
    })

    if(createTask) {
        const addToProject = await Project.findOneAndUpdate({_id: parsedBody.data.projectId}, {
            $push: {
                tasks: {
                    id: createTask._id
                }
            }
        })
        if(addToProject) {
            return res.status(200).json({
                    success: true,
                    message: "Task assigned to the user!"
            })
        } else {
            next(new ErrorHandler("Something went wrong", 400))
        }
    } else {
        next(new ErrorHandler("Something went wrong", 400))
    }
    next(new ErrorHandler("Something went wrong", 400))
}

export const updateTaskStatus = async(req,res,next) => {
    const { projectId, taskId } = req.params
    const { status } = req.body

    const validStatus = ['Todo','In-Progress','Done']

    if(!validStatus.includes(status)) {
        return next(new ErrorHandler("Invalid Status!"))
    }
    try {
        const task = await Task.findOneAndUpdate({ _id: taskId}, {
            status
        }, { new: true, populate: 'assignedTo' })

        if(!task) return next(new ErrorHandler("Task not found", 400))

        req.io.emit('taskStatusUpdated', task)
    
        return res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task
        })
    } catch (error) {
        return next(new ErrorHandler("Something went wrong!", 400))
    }
}