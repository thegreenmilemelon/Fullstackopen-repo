const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

// Testing the /blogs route

describe("blogs api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });
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

  test("blog without title and url cannot be created", async () => {
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

  test("deletion of a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length - 1);
    const contents = blogAtEnd.map((blog) => blog.title);
    assert(!contents.includes(blogToDelete.title));
  });

  test("updating a blog", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const initialLikes = blogToUpdate.likes;
    blogToUpdate.likes = blogToUpdate.likes + 1;
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogAtEnd = await helper.blogsInDb();
    const updatedBlog = blogAtEnd.find((blog) => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, initialLikes + 1);
  });
});

describe("user api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "root" });
    await user.save();
  });

  test("invalid users can not be created", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "root",
      password: "root",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
after(async () => {
  await mongoose.connection.close();
});
