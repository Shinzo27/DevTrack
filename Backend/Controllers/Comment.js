import { commentParser } from "../Config/Type.js";
import ErrorHandler from "../Middlewares/ErrorHandler.js";
import Comment from "../Models/Comment.js";

export const getComments = async (req,res,next) => {
    const projectId = req.params.projectId
    if(!projectId) return next(new ErrorHandler("Project Id not found!", 400))

    const comments = await Comment.find({project: projectId}).populate('user')

    return res.status(200).json({
        success: true,
        comments: comments
    })
}

export const addComments = async (req,res,next) => {
    const bodyParser = req.body;
    const parsedBody = commentParser.safeParse(bodyParser)
    if(parsedBody.error) return next(new ErrorHandler("Provide valid details!", 400));

    const addComment = new Comment({
        content: parsedBody.data.comment,
        user: parsedBody.data.userId,
        project: parsedBody.data.projectId
    })

    const savedComment = await addComment.save();

    const populatedComment = await Comment.findById(savedComment._id).populate('user').exec()

    if(addComment) {
        return res.status(200).json({
            success: true,
            message: "Comment added successfully!",
            comment: populatedComment
        })
    } else {
        next(new ErrorHandler("Something went wrong!", 400))
    }
}