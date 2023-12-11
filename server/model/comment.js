import mongoose from "mongoose";
const commentSchema = {
  name: {
    type: "string",
    required: true,
  },
  postId: {
    type: "string",
    required: true,
  },
  date: {
    type: "string",
    required: true,
  },
  comments: {
    type: "string",
    required: true,
  },
};

const comment = mongoose.model("comment", commentSchema);

export default comment;
