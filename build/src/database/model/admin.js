"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    email: { type: String, default: null },
    password: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.adminModel = mongoose_1.default.model("admin", adminSchema);
//# sourceMappingURL=admin.js.map