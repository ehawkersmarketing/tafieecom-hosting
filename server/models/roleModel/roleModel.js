const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "User"
    },
    permissions: [{ type: String }]
});

const roleModel = mongoose.model("Role", roleSchema);

module.exports = roleModel;