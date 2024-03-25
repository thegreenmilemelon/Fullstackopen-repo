const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const User = require("../models/user");

const api = supertest(app);

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
