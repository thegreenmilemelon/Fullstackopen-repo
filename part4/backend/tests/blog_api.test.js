const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

// Testing the /blogs route

test("blogs are returned as json", async () => {
  console.log("entered test");
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are six blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 6);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const id = response.body.map((blog) => blog.id);
  assert(id.includes("5a422b3a1b54a676234d17f9"));
});

test("a blog can be created", async () => {
  const newBlog = {
    title: "Test blog",
    author: "Test author",
    url: "Test url",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((blog) => blog.title);
  assert(contents.includes("Test blog"));
});

test("the default value of likes is zero", async () => {
  const newBlog = {
    title: "Test blog",
    author: "Test author",
    url: "Test url",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map((blog) => blog.likes);
  assert(likes.includes(0));
});

test.only("blog without title and url cannot be created", async () => {
  const newBlog = {
    author: "Test author",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
