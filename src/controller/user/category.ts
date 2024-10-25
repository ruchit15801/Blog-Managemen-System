import { categoryModel, } from '../../database'
import { apiResponse, } from '../../common'
import { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId


export const getCategory = async (req: Request, res: Response) => {
    try {
        let response = await categoryModel.find({ isActive: true })
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
