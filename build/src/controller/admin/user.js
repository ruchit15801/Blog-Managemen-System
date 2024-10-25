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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const database_1 = require("../../database");
const common_1 = require("../../common");
const helper_1 = require("../../helper");
const ObjectId = require('mongoose').Types.ObjectId;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.header('user');
    try {
        let response = yield database_1.userModel.find({ isActive: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.getDataSuccess('User'), response, {}));
        }
        else {
            return res.status(404).json(yield (0, common_1.apiResponse)(404, helper_1.responseMessage.getDataNotFound('User'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body, user = req.header('user');
    try {
        if (body.email) {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.customMessage("Email cannot be updated"), {}, {}));
        }
        let response = yield database_1.userModel.findOneAndUpdate({ _id: ObjectId(body._id), isActive: true }, body, { new: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.updateDataSuccess('User'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.updateDataError('User'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id, user = req.header('user');
    try {
        let response = yield database_1.userModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true });
        if (response) {
            let removePost = yield database_1.userModel.updateMany({ createdBy: user._id, isActive: true }, { $set: { isActive: false } });
            console.log('removePost :>> ', removePost);
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.deleteDataSuccess('User'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.deleteDataNotSuccess('User'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map