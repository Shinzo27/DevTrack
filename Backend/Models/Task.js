import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Todo', 'In-Progress', 'Done'], default: 'todo'
    },
    deadline: {
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)

export default Task