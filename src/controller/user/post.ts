import { postModel, } from '../../database'
import { apiResponse, } from '../../common'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import e, { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId



export const addPost = async (req: Request, res: Response) => {
    let body = req.body, user = req.header('user') as any
    try {
        body.createdBy = ObjectId(user._id)
        let response = await new postModel(body).save()
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('Post'), response, {}))
        } else {
            return res.status(401).json(await apiResponse(401, responseMessage.addDataError('Post'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const getPost = async (req: Request, res: Response) => {
    let user = req.header('user') as any
    try {
        let response = await postModel.aggregate([
            { $match: { createdBy: user._id, isActive: true } },
            { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "categories",
                    let: { id: '$categoryId' },
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
                        { $project: { name: 1, _id: 0 } }
                    ],
                    as: "categoryData",
                }
            },
            { $unwind: { path: '$categoryData', preserveNullAndEmptyArrays: true } },
        ])
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('Post'), response, {}))
        } else {
            return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('Post'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const updatePost = async (req: Request, res: Response) => {
    let body = req.body, user = req.header('user') as any
    try {
        let response = await postModel.findOneAndUpdate({ _id: ObjectId(body._id), createdBy: user._id, isActive: true }, body, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('Post'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.updateDataError('Post'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const deletePost = async (req: Request, res: Response) => {
    let id = req.params.id, user = req.header('user') as any
    try {
        let response = await postModel.findOneAndUpdate({ _id: ObjectId(id), createdBy: user._id, isActive: true }, { isActive: false }, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess('Post'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.deleteDataNotSuccess('Post'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}