const orderModel = require("../../models/orderModel/orderModel.js");
const orderCountModel = require("../../models/orderModel/orderCountModel.js");
const cartModel = require("../../models/cartModel/cartModel.js");

module.exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getOrderById = async (req, res, next) => {
    try {
        const orders = await orderModel.findOne({ _id: req.params.id }).populate('user').populate('userAddress');
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getAllOrdersByStatus = async (req, res, next) => {
    try {
        const { OrderStatus } = req.params.orderStatus;
        const orders = await orderModel.find({ orderStatus: OrderStatus });
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.json({ success: false, error: error });
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

module.exports.placeOrder = async (req, res, next) => {
    try {
        const { cartId, transactionId, amount, transactionStatus, userAddress } = req.body;
        console.log(`${cartId} - ${transactionId} - ${amount} - ${transactionStatus} - ${merchantId}`);
        const cart = await cartModel.findOne({ _id: cartId });
        if (cart) {
            const newOrder = new orderModel({
                products: cart.products,
                user: cart.userId,
                amount: amount,
                transactionId: transactionId,
                transactionStatus: transactionStatus,
                userAddress: userAddress,
            });
            await newOrder.save();

            for (var i = 0; i < cart.products.length; i++) {

                const product = await orderCountModel.findOne({ productId: cart.products[i].productId });
                if (product) {
                    await orderCountModel.findOneAndUpdate(
                        { productId: cart.products[i].productId },
                        { $inc: { orderCount: cart.products[i].units } },
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

module.exports.cancelOrders = async (req, res, next) => {
    const { orderId } = req.params.orderId;
    let order = await orderModel.findOne({ _id: orderId });
    if (order && (order.transactionStatus === "PENDING" || order.transactionStatus === "PLACED")) {
        order = order.toObject();
        order.transactionStatus = "CANCELLED";
        await orderModel.findOneAndUpdate({ _id: orderId }, order, { new: true });
        res.status(200).json({
            success: true,
            data: order
        });
    } else {
        res.status(404).json({
            success: false,
            message: "Order cannot be canceled"
        });
    }
};