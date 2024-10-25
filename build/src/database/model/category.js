"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: { type: String, default: null },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "admin" },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.categoryModel = mongoose_1.default.model("category", categorySchema);
//# sourceMappingURL=category.js.map