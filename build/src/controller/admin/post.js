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
exports.deletePost = exports.updatePost = exports.getPost = void 0;
const database_1 = require("../../database");
const common_1 = require("../../common");
const helper_1 = require("../../helper");
const ObjectId = require('mongoose').Types.ObjectId;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { search } = req.body, match = { isActive: true };
    try {
        if (search && search != "") {
            let titleArray = [];
            search = search.split(" ");
            yield search.forEach(data => {
                titleArray.push({ title: { $regex: data, $options: 'si' } });
            });
            match.$or = [{ $and: titleArray }];
            0;
        }
        let response = yield database_1.postModel.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: "users",
                    let: { id: '$createdBy' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$_id', '$$id'] },
                                        { $eq: ['$isActive', true] },
                                    ],
                                },
                            }
                        },
                        { $project: { name: 1, email: 1 } }
                    ],
                    as: "userData"
                }
            },
        ]);
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.getDataSuccess('Post'), response, {}));
        }
        else {
            return res.status(404).json(yield (0, common_1.apiResponse)(404, helper_1.responseMessage.getDataNotFound('Post'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    try {
        let response = yield database_1.postModel.findOneAndUpdate({ _id: ObjectId(body._id), isActive: true }, body, { new: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.updateDataSuccess('Post'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.updateDataError('Post'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        let response = yield database_1.postModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true });
        if (response) {
            return res.status(200).json(yield (0, common_1.apiResponse)(200, helper_1.responseMessage.deleteDataSuccess('Post'), response, {}));
        }
        else {
            return res.status(400).json(yield (0, common_1.apiResponse)(400, helper_1.responseMessage.deleteDataNotSuccess('Post'), {}, {}));
        }
    }
    catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(yield (0, common_1.apiResponse)(500, helper_1.responseMessage.internalServerError, {}, error));
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=post.js.map