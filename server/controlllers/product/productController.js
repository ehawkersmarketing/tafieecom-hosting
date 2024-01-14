const mongoose = require("mongoose");
const express = require("express");

//GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    // const blogs = await productModel.find({});
    // if (!products) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "No products found",
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      //   productCount: products.length,
      //   products,
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
