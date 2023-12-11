import { request } from "express";
import Comment from "../model/comment.js";



export const newComment = async (request, response) => {
  try {
     const comment = await new Comment(request.body);
   //   console.log("hh", request.body.comments);

    comment.save();
    response.status(200).json({ msg: "comment save successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const getComments = async (request, response) => {
  try {
     const comments = await Comment.find({postId: request.params.id});
    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);

    await Comment.deleteOne({_id:comment._id});

    response.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    response.status(404).json({ error:error});
  }
};
