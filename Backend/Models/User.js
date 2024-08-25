import mongoose, { Schema, model } from 'mongoose'; 

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        required: true,
    },
    projects: [{
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        role: {
            type: String,
            enum: ['Product Manager','Team Member'],
            default: 'Team Member'
        }
    }]
});

const User = model('User', userSchema);

export default User