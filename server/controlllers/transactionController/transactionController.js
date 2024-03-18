const transactionModel = require('../../models/transactionModel/transactionModel');

exports.createTransaction = async (req, res) => {
   try {
    const {transactionId  , refundTransactionId , amount , status,cartId} = req.body;
   
    const transaction = new transactionModel({
        transactionId: transactionId,
        refundTransactionId: refundTransactionId,
        amount: amount,
        status: status,
        cartId: cartId
    })

    const data = await transaction.save();
    res.status(200).send({
        success: true,
        message: "Transaction created successfully",
        data: data
    })
   } catch (error) {
    console.log("transaction error")
     return res.status({
         success: false,
         message: error
     })
   }

}

exports.getLatestTransactionByUserId = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const userId = req.params.userId;
        console.log(userId)

        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "User ID is required"
            });
        }

        // Fetch the latest transaction for the specified user ID by sorting by the 'date' field in descending order
        // Use 'userId' instead of 'merchantUserId' to match the schema
        const latestTransaction = await transactionModel.findOne({ orderId: userId }).sort({ date: -1 });
        console.log("Query result:", latestTransaction);
        
        if (!latestTransaction) {
            return res.status(404).send({
                success: false,
                message: "No transactions found for the specified user ID"
            });
        }

        res.status(200).send({
            success: true,
            message: "Latest transaction for the specified user ID fetched successfully",
            data: latestTransaction
        });
    } catch (error) {
        console.error("Error fetching latest transaction by user ID:", error);
        return res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

