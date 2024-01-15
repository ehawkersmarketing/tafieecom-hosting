const express = require("express");
const {
  composeBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../../controlllers/blog/blogController");

const router = express.Router();

// POST || creating new blog
router.post("/composeBlog", composeBlog);

// GET || getting all blogs
router.get("/blogs", getAllBlogs);

// GET || getting a blog by id
router.get("/:blogID", getBlogById);

// PUT || updating a blog by id
router.put("/updateBlog/:blogId", updateBlog);

// DELETE || deleting a blog by id
router.delete("/deleteBlog/:blogId", deleteBlog);

module.exports = router;
