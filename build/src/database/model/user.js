"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.js.map