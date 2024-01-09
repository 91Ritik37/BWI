const mongoose = require("mongoose");

const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },

        profile_image: {
            data: Buffer,
            contentType: String,
        },
        email: {
            type: String,
            require: [true, "email is required"],
            unique: true,
        },
        phone_number: {
            type: Number,
            require: [true, "phone_number is required"],
            unique: true,

        },

        password: {
            type: String,
            require: [true, "password is required"]
        },
    },
    { timestamps: true },


)



const user = mongoose.model("User", userSchema);
module.exports = user;