import mongoose from "mongoose";

const userSchema: any = new mongoose.Schema(
    {
        firstName: { type: String, default: null },
        lastName: { type: String, default: null },
        email: { type: String, default: null },
        password: { type: String, default: null },
        phoneNumber: { type: String, default: null },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
