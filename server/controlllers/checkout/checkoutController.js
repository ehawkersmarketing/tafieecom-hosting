const express = require("express");

// POST || checkout with products
exports.checkoutProcess = async (req, res) => {
  try {
    const { cartId } = req.body;

    //FUNCTIONALITY TO BE PUT HERE

    res.status(200).send({
      success: true,
      message: "checkout process running successfully",
      cartId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "checkout process failed [see checkoutController]",
    });
  }
};
