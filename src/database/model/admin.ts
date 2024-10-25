import mongoose from "mongoose";

const adminSchema: any = new mongoose.Schema(
    {
        email: { type: String, default: null },
        password: { type: String, default: null },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const adminModel = mongoose.model("admin", adminSchema);
