import { Schema, model } from "mongoose"; // Erase if already required

// Declare the Schema of the Mongo model
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Comment = model("Comment", commentSchema);
//Export the model
export default Comment
