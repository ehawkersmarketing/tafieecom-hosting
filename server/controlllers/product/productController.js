const productModel = require('../../models/productModel/productModel.js');


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(products)
    if (!products) {
      return res.status(500).send({
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

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, fileName, quantity, metric, companyName, productType } = req.body;

    const product = await productModel.create({
      title, description, image: fileName, price, quantity, metric, companyName, productType
    });
    if (product) {
      res.json({
        status: 200,
        success: true,
        data: {},
        messsage: "Product Created successfully"
      })
    } else {
      res.json({
        success: false,
        messsage: "Product Creation failed"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error while creating a product",
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price, quantity, metric, companyName, productType
    } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      { _id: id },
      {
        title, description, image, price, quantity, metric, companyName, productType
      })

    console.log(updatedProduct)

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated Successfully"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      data: error,
      message: "Error while updating the product"
    })
  }
}


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price, quantity, metric, companyName, productType
    } = req.body;
    const deletedProduct = await productModel.findByIdAndDelete({ _id: id })

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      data: error,
      message: "Error fetched while deleting the product"
    })
  }
}

exports.searchProduct = async (req, res) => {
  try {
    const { search } = req.body;
    const products = await productModel.find({
      $or: [
        { title: search },
        { description: search },
        { productType: { "$in": [search] } },
      ]
    });
    console.log(products)
    if (!products) {
      return res.status(500).send({
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
    res.status(500).json({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};