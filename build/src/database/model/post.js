"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: { type: String, default: null },
    description: { type: String, default: null },
    tags: { type: Array, default: null },
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "category" },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.postModel = mongoose_1.default.model("post", postSchema);
//# sourceMappingURL=post.js.map