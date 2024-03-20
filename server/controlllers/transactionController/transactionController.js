const transactionModel = require("../../models/transactionModel/transactionModel");

exports.createTransaction = async (req, res) => {
  try {
    const { transactionId, refundTransactionId, amount, status, cartId } =
      req.body;

    const transaction = new transactionModel({
      transactionId: transactionId,
      refundTransactionId: refundTransactionId,
      amount: amount,
      status: status,
      cartId: cartId,
    });

    const data = await transaction.save();
    res.status(200).send({
      success: true,
      message: "Transaction created successfully",
      data: data,
    });
  } catch (error) {
    console.log("transaction error");
    return res.status({
      success: false,
      message: error,
    });
  }
};


// exports.getTransactionByMerchantTransactionId = async (req, res) => {
//   try {
//      const merchantTransactionId = req.params.merchantTransactionId;
 
//      if (!merchantTransactionId) {
//        return res.status(400).send({
//          success: false,
//          message: "Merchant Transaction ID is required",
//        });
//      }
//      const transaction = await transactionModel
//        .findOne({ merchantTransactionId: merchantTransactionId })
//        .populate({
//          path: 'orderId',
//          populate: {
//              path: 'userAddress',
//              model: 'UserAddress' // Assuming 'Address' is the name of your Address model
//          }
//      });
//      console.log("Query result:", transaction);
 
//      if (!transaction) {
//        return res.status(404).send({
//          success: false,
//          message: "No transaction found for the specified Merchant Transaction ID",
//        });
//      }
 
//      res.status(200).send({
//        success: true,
//        message: "Transaction for the specified Merchant Transaction ID fetched successfully",
//        data: transaction,
//      });
//   } catch (error) {
//      console.error("Error fetching transaction by Merchant Transaction ID:", error);
//      return res.status(500).send({
//        success: false,
//        message: "Server error",
//      });
//   }
//  };
 
