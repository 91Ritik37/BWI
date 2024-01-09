const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'role name is required'],
        unique: true,
    },


},
    { timestamps: true }
);

const role = mongoose.model('Role', roleSchema);

module.exports = role;