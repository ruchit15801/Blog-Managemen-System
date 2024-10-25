import mongoose from "mongoose";

const categorySchema: any = new mongoose.Schema(
    {
        name: { type: String, default: null },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const categoryModel = mongoose.model("category", categorySchema);
