import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 1
    },
    links: [
        {
            url: String,
            title: String,
            icon: String
        }
    ],
    socialMedia: {
        facebook: String,
        instagram: String,
        threads: String,
        linkedin: String,
        twitter: String,
        github: String,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, { timestamps: true });

const User = mongoose.models.Users || mongoose.model("Users", userSchema);

export default User;
