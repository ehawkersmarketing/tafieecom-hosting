const productModel = require("../models/productModel/productModel");

exports.getAllProducts = async (req, res) => {
 try {
   const products = await productModel.find({});
   return res.status(200).send({
     productCount: products.length,
     success: true,
     message: "all products data",
     products,
   });
 } catch (error) {
   console.log(error);
   return res.status(500).send({
     success: false,
     message: "Error In Get All Products",
     error,
   });
 }
};
