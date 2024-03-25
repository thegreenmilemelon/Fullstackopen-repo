const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    user: 1,
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ error: "token invalid" });
    }
    const blogToDelete = await Blog.findById(request.params.id);
    if (!blogToDelete) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blogToDelete.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "You do not have permission to delete this blog." });
    }
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).send();
  }
);

blogsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updateBlog) => {
      response.json(updateBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
