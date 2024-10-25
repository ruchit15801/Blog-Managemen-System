"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = void 0;
const Joi = __importStar(require("joi"));
const common_1 = require("../common");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        firstName: Joi.string().error(new Error('firstName is string!')),
        lastName: Joi.string().error(new Error('lastName is string!')),
        phoneNumber: Joi.string().error(new Error('phoneNumber is string!')),
        email: Joi.string().error(new Error('email is string!')),
        username: Joi.string().error(new Error('username is string!')),
        password: Joi.string().error(new Error('password is string!')),
    });
    schema.validateAsync(req.body).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(result, "---------------------------result");
        return next();
    })).catch((error) => __awaiter(void 0, void 0, void 0, function* () { res.status(400).json(yield (0, common_1.apiResponse)(400, error.message, {}, {})); }));
});
exports.signUp = signUp;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = Joi.object({
        email: Joi.string().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
    });
    schema.validateAsync(req.body).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log(result, "---------------------------result");
        return next();
    })).catch((error) => __awaiter(void 0, void 0, void 0, function* () { res.status(400).json(yield (0, common_1.apiResponse)(400, error.message, {}, {})); }));
});
exports.login = login;
//# sourceMappingURL=user.js.map