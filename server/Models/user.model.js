const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user"
        },
        savedFunds: [
            {
                type: Number,
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.models.users || mongoose.model("users", UserSchema);

module.exports = Users;