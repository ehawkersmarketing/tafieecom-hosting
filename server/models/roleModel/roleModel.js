const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    role :{
        type:String
    },
    permissions : [{type:String}]
    },
    {timestamps: true}
);

const roleModel = mongoose.model("Role", roleSchema);

module.exports = roleModel;