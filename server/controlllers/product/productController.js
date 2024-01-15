const productModel = require('../../models/productModel/productModel.js');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    if (!products) {
      return res.status(200).send({
        success: false,
        message: "No products found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: products,
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
