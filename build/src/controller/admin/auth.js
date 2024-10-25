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
exports.login = exports.signUp = void 0;
const database_1 = require("../../database");
const common_1 = require("../../common");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../../helper");
const ObjectId = require('mongoose').Types.ObjectId;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let jwt_token_secret = process.env.JWT_SECRET_KEY;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let [isAlready] = yield Promise.all([
            database_1.adminModel.findOne({ email: body === null || body === void 0 ? void 0 : body.email, isActive: true }),
        ]);
        if (isAlready)
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage === null || helper_1.responseMessage === void 0 ? void 0 : helper_1.responseMessage.alreadyEmail, {}, {}));
        const salt = yield bcryptjs_1.default.genSaltSync(8);
        const hashPassword = yield bcryptjs_1.default.hash(body.password, salt);
        delete body.password;
        body.password = hashPassword;
        let response = yield new database_1.adminModel(body).save();
        console.log('response :>> ', response);
        const token = jsonwebtoken_1.default.sign({
            _id: response._id,
            status: "Signup",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret);
        response = Object.assign(Object.assign({}, response._doc), { token });
        return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.signupSuccess, response, {}));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    try {
        let response = yield database_1.adminModel.findOne({ email: body.email, isActive: true });
        if (!response)
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.invalidUserPasswordEmail, {}, {}));
        const passwordMatch = yield bcryptjs_1.default.compare(body.password, response.password);
        if (!passwordMatch)
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.invalidUserPasswordEmail, {}, {}));
        const token = jsonwebtoken_1.default.sign({
            _id: response._id,
            status: "Login",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret);
        response = Object.assign(Object.assign({}, response._doc), { token });
        return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.loginSuccess, response, {}));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map