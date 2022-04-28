const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res) => {
  // const data = await client.query(baseQuery);
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: "Title",
      content: "Content",
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.json(page);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

function generateSlug(title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}
Page.addHook("beforeValidate", (page, options) => {
  page.slug = generateSlug(page.title);
});
