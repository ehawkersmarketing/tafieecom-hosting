const mongoose = require("mongoose");
const express = require("express");
const userModel = require("../../models/userModel/userModel");
const blogModel = require("../../models/blogModel/blogModel");

exports.composeBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // const existingUser = await userModel.findById(id);
    // if (!existingUser) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "Unable to find user",
    //   });
    // }
    const newBlog = new blogModel({ title, content });
    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "New blog uploaded",
      newBlog,
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

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    console.log(blogs);
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: blogs,
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

exports.getBlogById = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await blogModel.findById(blogID);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blog found for given ID",
        error,
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetched single blog",
      blog,
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
    const updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { title, content }
    );
    await updatedBlog.save();
    return res.status(200).send({
      success: true,
      message: "Blog updated.",
      updatedBlog

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

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findOneAndDelete(blogId);
    if (blog) {
      return res.status(200).send({
        success: true,
        message: "Blog deleted!!",
      });
    }
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


exports.searchBlog = async (req, res) => {
  try {
    const search = req.query.blogId;
    const blog = await blogModel.find({ title: search });
    console.log(blog)
    if (!blog) {
      return res.status(500).send({
        success: false,
        message: "No blog found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};