import { postModel, } from '../../database'
import { apiResponse, } from '../../common'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import e, { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId



export const getPost = async (req: Request, res: Response) => {
    let { search } = req.body, match: any = { isActive: true }
    try {
        if (search && search != "") {
            let titleArray: Array<any> = []

            search = search.split(" ")
            await search.forEach(data => {
                titleArray.push({ title: { $regex: data, $options: 'si' } })
            })
            match.$or = [{ $and: titleArray }]; 0
        }

        let response = await postModel.aggregate([
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
    let body = req.body
    try {
        let response = await postModel.findOneAndUpdate({ _id: ObjectId(body._id), isActive: true }, body, { new: true })
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
    let id = req.params.id
    try {
        let response = await postModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })
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