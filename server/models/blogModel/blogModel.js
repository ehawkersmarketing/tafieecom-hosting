const mongoose = require('mongoose')

const blogModel = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const blogSchema = mongoose.model("Blog", blogModel)

module.exports = blogSchema;