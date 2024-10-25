"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJWT = exports.userJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const mongoose_1 = __importDefault(require("mongoose"));
const common_1 = require("../common");
const response_1 = require("./response");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let jwt_token_secret = process.env.JWT_SECRET_KEY;
const ObjectId = mongoose_1.default.Types.ObjectId;
const userJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { authorization } = req.headers, result;
    if (authorization) {
        try {
            let isVerifyToken = jsonwebtoken_1.default.verify(authorization, jwt_token_secret);
            result = yield database_1.userModel.findOne({ _id: new ObjectId(isVerifyToken._id), isActive: true });
            if ((result === null || result === void 0 ? void 0 : result.isActive) == true) {
                req.headers.user = result;
                return next();
            }
            else {
                return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.invalidToken, {}, {}));
            }
        }
        catch (err) {
            if (err.message == "invalid signature")
                return res.status(403).json(yield (0, common_1.apiResponse)(403, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.differentToken, {}, {}));
            console.log(err);
            return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage.invalidToken, {}, {}));
        }
    }
    else {
        return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.tokenNotFound, null, {}));
    }
});
exports.userJWT = userJWT;
const adminJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { authorization } = req.headers, result;
    if (authorization) {
        try {
            let isVerifyToken = jsonwebtoken_1.default.verify(authorization, jwt_token_secret);
            result = yield database_1.adminModel.findOne({ _id: new ObjectId(isVerifyToken._id), isActive: true });
            if ((result === null || result === void 0 ? void 0 : result.isActive) == true) {
                req.headers.user = result;
                return next();
            }
            else {
                return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.invalidToken, {}, {}));
            }
        }
        catch (err) {
            if (err.message == "invalid signature")
                return res.status(403).json(yield (0, common_1.apiResponse)(403, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.differentToken, {}, {}));
            console.log(err);
            return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage.invalidToken, {}, {}));
        }
    }
    else {
        return res.status(401).json(yield (0, common_1.apiResponse)(401, response_1.responseMessage === null || response_1.responseMessage === void 0 ? void 0 : response_1.responseMessage.tokenNotFound, null, {}));
    }
});
exports.adminJWT = adminJWT;
//# sourceMappingURL=jwt.js.map