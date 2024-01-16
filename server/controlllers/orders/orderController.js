const orderModel = require("../../models/orderModel/orderModel.js");
const orderCountModel = require("../../models/orderCountModel/orderCountModel.js");
const cartModel = require("../../models/cartModel/cartModel.js");

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllOrderByUser = async (req, res, next) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

module.exports.getOrderCountOfProduct = async (req, res, next) => {
    try {
        const orders = await orderCountModel.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

module.exports.placeOrder = async (req, res, next) => {
    try {
        const { cartId } = req.body;
        const cart = await cartModel.findOne({ _id: cartId });
        if (cart) {
            const newOrder = new orderModel({
                products: cart.products,
                userId: cart.userId
            });
            await newOrder.save();

            for (var i = 0; i < cart.products.length; i++) {

                const product = await orderCountModel.findOne({ productId: cart.products[i]._id });
                if (product) {
                    await orderCountModel.findOneAndUpdate(
                        { productId: cart.products[i].productId },
                        { $inc: { count: cart.products[i].units } },
                        { new: true }
                    );
                } else {
                    const newOrderCount = new orderCountModel({
                        productId: cart.products[i].productId,
                        count: cart.products[i].units
                    });
                    await newOrderCount.save();
                }
            }
            res.status(200).json({
                success: true,
                data: newOrder
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to create order"
        })
        next(error);
    }
};

module.exports.getAllOrderCounts = async (req, res, next) => {
    try {
        const orders = await orderCountModel.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.json({ success: false, message: error.toString() });
        next(error);
    }
};