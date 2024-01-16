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


router.get("/blogs", getAllBlogs);
router.get("blog/:blogId", getBlogById);
router.patch("/updateBlog/:blogId", updateBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);

module.exports = router;
