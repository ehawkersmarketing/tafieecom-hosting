const express = require("express");
const {
  composeBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlog,
} = require("../../controlllers/blog/blogController");

const router = express.Router();

// POST || creating new blog
router.post("/composeBlog", composeBlog);

router.get("/blogs", getAllBlogs);
router.get("/blog/:blogId", getBlogById);
router.put("/updateBlog/:blogId", updateBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);
// router.get("/searchBlog", searchBlog);

module.exports = router;
