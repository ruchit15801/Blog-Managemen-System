import mongoose from "mongoose";

const postSchema: any = new mongoose.Schema(
    {
        title: { type: String, default: null },
        description: { type: String, default: null },
        tags: { type: Array, default: null },
        categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const postModel = mongoose.model("post", postSchema);
