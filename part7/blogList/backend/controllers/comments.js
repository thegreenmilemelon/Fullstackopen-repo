const commentRouter = require("express").Router();
const Comment = require("../models/comment");

commentRouter.get("/:id/comments", async (request, response) => {
  const comments = await Comment.find({});
  response.json(comments);
});

commentRouter.post("/:id/comments", async (request, response) => {
  const comment = new Comment(request.body);
  const savedComment = await comment.save();
  response.status(201).json(savedComment);
});

module.exports = commentRouter;
