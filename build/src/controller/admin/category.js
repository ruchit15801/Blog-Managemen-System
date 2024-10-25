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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.addCategory = void 0;
const database_1 = require("../../database");
const common_1 = require("../../common");
const helper_1 = require("../../helper");
const ObjectId = require('mongoose').Types.ObjectId;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body, user = req.header('user');
    try {
        body.createdBy = ObjectId(user._id);
        let response = yield new database_1.categoryModel(body).save();
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.addDataSuccess('Category'), response, {}));
        }
        else {
            return res.status(401).json(yield (0, common_1.apiResponse)(401, helper_1.responseMessage.addDataError('Category'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.addCategory = addCategory;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.header('user');
    try {
        let response = yield database_1.categoryModel.find({ createdBy: user._id, isActive: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.getDataSuccess('Category'), response, {}));
        }
        else {
            return res.status(404).json(yield (0, common_1.apiResponse)(404, helper_1.responseMessage.getDataNotFound('Category'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.getCategory = getCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body, user = req.header('user');
    try {
        let response = yield database_1.categoryModel.findOneAndUpdate({ _id: ObjectId(body._id), createdBy: user._id, isActive: true }, body, { new: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.updateDataSuccess('Category'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.updateDataError('Category'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id, user = req.header('user');
    try {
        let response = yield database_1.categoryModel.findOneAndUpdate({ _id: ObjectId(id), createdBy: user._id, isActive: true }, { isActive: false }, { new: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.deleteDataSuccess('Category'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.deleteDataNotSuccess('Category'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map