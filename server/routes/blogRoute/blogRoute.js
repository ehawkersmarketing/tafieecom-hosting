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
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/blog/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

// POST || creating new blog
router.post("/uploadBlogImage", upload.single("image"), (req, res) => {
  console.log(req.file.filename);
  res.json({
    success: true,
    message: "Image Uploaded Successfully",
    url: req.file.filename,
  });
});
router.post("/composeBlog", composeBlog);
router.get("/blogs", getAllBlogs);
router.get("/blog/:blogId", getBlogById);
router.put("/updateBlog/:blogId", updateBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);
router.post("/searchBlog", searchBlog);
// router.get("/searchBlog", searchBlog);

module.exports = router;
