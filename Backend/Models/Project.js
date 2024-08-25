import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deadline: {
        type: String
    },
    startDate: {
        type: String
    },
    users: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        role: {
            type: String,
            enum: ["Product Manager", "Team Member"]
        }
    }],
    tasks: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    }],
    status: {
        type: String,
        enum: ["Todo", "In-progress", "Finished"]
    }
}, { timestamps: true})

const Project = mongoose.model('Project', projectSchema)

export default Project