const mongoose = require("mongoose");
const express = require("express");

//CREATE BLOG
exports.composeBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    //validating the recieved input
    if (!title || !content || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //   const existingUser = await userModel.findById(user);
    //   if (!existingUser) {
    //     return res.status(404).send({
    //       success: false,
    //       message: "Unable to find user",
    //     });
    //   }
    //   const newBlog = new blogModel({ title, content, image });

    return res.status(201).send({
      success: true,
      message: "New blog uploaded",
      //   newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while composing blog",
      error,
    });
  }
};

//GET ALL BLOGS
exports.getAllBlogs = async (req, res) => {
  try {
    // const blogs = await blogModel.find({});
    // if (!blogs) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "No blogs found",
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      //   blogCount: blogs.length,
      //   blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

//GET ONE BLOG BY ID
exports.getBlogById = async (req, res) => {
  try {
    const { blogID } = req.params;
    //     const blog = await blogModel.findById(blogID);
    //     if (!blog) {
    //       return res.status(404).send({
    //         success: false,
    //         message: "No blog found for given ID",
    //         error,
    //       });
    // }
    return res.status(200).send({
      success: true,
      message: "Fetched single blog",
      //   blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting blog by ID",
      error,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;

    //     const blog = await blogModel.findByIdAndUpdate(
    //       blogId,
    //       { ...req.body },
    //       { new: true }
    //     );
    return res.status(200).send({
      success: true,
      message: "Blog updated.",
      //   blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      messaage: "Error while updating blogs",
      error,
    });
  }
};

// //DELETE BLOG
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    // const blog = await blogModel.findOneAndDelete(blogId);
    // if(blog){
    //     return res.status(200).send({
    //         success: true,
    //         message: "Blog deleted!!",
    //       });
    // }
    return res.status(200).send({
      success: true,
      message: "Blog deleted!!",
      blogId,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};
