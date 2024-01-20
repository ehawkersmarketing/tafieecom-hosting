const reviewModel = require("../../models/reviewModel/reviewModel");

module.exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ productId: req.params.productId });
        if (reviews) {
            res.status(200).json({
                success: true,
                data: reviews
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No reviews found"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.addReview = async (req, res) => {
    try {
        const { userId, reviewContent, rating, productId } = req.body;
        const review = await reviewModel.find({ productId: productId });
        if (review) {
            review = review.toObject();
            review.reviews.push({
                userId: userId,
                review: reviewContent,
                rating: rating
            });
            const updatedReview = await reviewModel.findOneAndUpdate(
                { productId: userId },
                { $set: { reviews: userCart.products } },
                { new: true }
            );
            if (updatedReview) {
                res.status(200).json({
                    success: true,
                    data: updatedReview
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Failed to update review"
                });
            }
        } else {
            const newReview = new reviewModel({
                productId: productId,
                reviews: [
                    {
                        userId: userId,
                        review: reviewContent,
                        rating: rating
                    }
                ],
            });
            await newReview.save();
            res.status(200).json({
                success: true,
                data: newReview
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};