import { categoryModel, } from '../../database'
import { apiResponse, } from '../../common'
import { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId



export const addCategory = async (req: Request, res: Response) => {
    let body = req.body, user = req.header('user') as any
    try {
        body.createdBy = ObjectId(user._id)
        let response = await new categoryModel(body).save()
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('Category'), response, {}))
        } else {
            return res.status(401).json(await apiResponse(401, responseMessage.addDataError('Category'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const getCategory = async (req: Request, res: Response) => {
    let user = req.header('user') as any
    try {
        let response = await categoryModel.find({ createdBy: user._id, isActive: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('Category'), response, {}))
        } else {
            return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('Category'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    let body = req.body, user = req.header('user') as any
    try {
        let response = await categoryModel.findOneAndUpdate({ _id: ObjectId(body._id), createdBy: user._id, isActive: true }, body, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('Category'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.updateDataError('Category'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    let id = req.params.id, user = req.header('user') as any
    try {
        let response = await categoryModel.findOneAndUpdate({ _id: ObjectId(id), createdBy: user._id, isActive: true }, { isActive: false }, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess('Category'), response, {}))
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.deleteDataNotSuccess('Category'), {}, {}))
        }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}