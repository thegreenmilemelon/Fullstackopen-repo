const { test, expect, describe, beforeEach } = require("@playwright/test");

const { loginWith, createBlog } = require("./helper");

describe("Blog App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "petter",
        name: "Petter Liutgard",
        password: "petter",
      },
    });
    await request.post("/api/users", {
      data: {
        username: "torpe",
        name: "Tork Petro",
        password: "torpe",
      },
    });

    await page.goto("/");
  });
  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Blogs");
    await expect(locator).toBeVisible();
  });

  test("user can login", async ({ page }) => {
    await loginWith(page, "petter", "petter");
    await expect(page.getByText("Logged in as Petter Liutgard")).toBeVisible();
  });

  test("login failes with wrong credentials", async ({ page }) => {
    await loginWith(page, "petter", "wrong");
    await expect(page.getByText("Wrong username or password.")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "petter", "petter");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "Test Blog", "Test Author", "http://testurl.com");
      await expect(
        page.getByText("a new blog Test Blog by Test Author added", {
          exact: false,
        })
      ).toBeVisible();
    });

    describe("and can be edited", () => {
      beforeEach(async ({ page }) => {
        await createBlog(
          page,
          "Test Blog",
          "Test Author",
          "http://testurl.com"
        );
      });
      test("a blog can be liked", async ({ page }) => {
        await page.getByTestId("view").click();
        await expect(page.getByText("likes 0")).toBeVisible();
        await page.getByTestId("like").click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });

      test("a blog can be deleted by the user", async ({ page }) => {
        await page.getByTestId("view").click();
        const removeButton = await page.getByTestId("remove");
        await expect(removeButton).toBeVisible();
        page.on("dialog", (dialog) => dialog.accept());
        await removeButton.click();
        await expect(page.getByText("Blog deleted successfully")).toBeVisible();
      });
    });
  });
});
