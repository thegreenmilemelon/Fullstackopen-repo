const commentRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentRouter.get("/:id/comments", async (request, response) => {
  const comments = await Blog.findById(request.params.id).populate("comment");
  response.json(comments);
});

commentRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    content: body.content,
    blogs: blog._id,
  });
  if (body.content === undefined) {
    response.status(400).end();
  } else {
    const savedComment = await comment.save();

    blog.comment = blog.comment.concat(savedComment._id);
    await blog.save();

    response.status(201).json(savedComment);
  }
});

module.exports = commentRouter;
