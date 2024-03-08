const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl =
  "mongodb+srv://fullstackPart3:bfugDLn36jT5nMzL@cluster0.egii1dr.mongodb.net/blogApp?retryWrites=true&w=majority";

console.log("connecting to MongoDB", mongoUrl);
mongoose.connect(mongoUrl).then(() => {
  console.log("connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body :date[web] :remote-addr"
  )
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
