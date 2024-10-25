"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUrl = process.env.DB_URL;
console.log(dbUrl);
const mongooseConnection = (0, express_1.default)();
exports.mongooseConnection = mongooseConnection;
mongoose_1.default.connect(dbUrl).then(() => console.log('Database successfully connected')).catch(err => console.log(err));
//# sourceMappingURL=index.js.map