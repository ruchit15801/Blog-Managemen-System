import { userModel, } from '../../database'
import { apiResponse, } from '../../common'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import e, { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId


export const getUser = async (req: Request, res: Response) => {
    let user = req.header('user') as any
    try {
        let response = await userModel.find({ isActive: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('User'), response, {}))
        } else {
            return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('User'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const updateUser = async (req: Request, res: Response) => {
    let body = req.body, user = req.header('user') as any
    try {
        if (body.email) {
            return res.status(400).json(await apiResponse(400, responseMessage.customMessage("Email cannot be updated"), {}, {}))
        }
        let response = await userModel.findOneAndUpdate({ _id: ObjectId(body._id), isActive: true }, body, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('User'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.updateDataError('User'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    let id = req.params.id, user = req.header('user') as any
    try {
        let response = await userModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, { isActive: false }, { new: true })
        if (response) {
            let removePost = await userModel.updateMany({ createdBy: user._id, isActive: true }, { $set: { isActive: false } })
            console.log('removePost :>> ', removePost);
            return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess('User'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.deleteDataNotSuccess('User'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}