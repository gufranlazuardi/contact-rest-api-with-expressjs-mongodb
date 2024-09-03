const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add the username"],
            unique: [true, "Username already taken"],
        },
        email: {
            type: String,
            required: [true, "Please add the email"],
            unique: [true, "Email already taken"],
        },
        password: {
            type: String,
            required: [true, "Please add the password"],
        },
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model("User", userSchema);
