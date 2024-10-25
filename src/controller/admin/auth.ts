import { adminModel, } from '../../database'
import { apiResponse, } from '../../common'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import e, { Request, Response } from 'express'
import { responseMessage } from '../../helper'
const ObjectId = require('mongoose').Types.ObjectId
import dotenv from 'dotenv'
dotenv.config()
let jwt_token_secret = process.env.JWT_SECRET_KEY

export const signUp = async (req: Request, res: Response) => {
    try {
        let body = req.body
        let [isAlready]: any = await Promise.all([
            adminModel.findOne({ email: body?.email, isActive: true }),
        ])
        if (isAlready) return res.status(400).json(await apiResponse(400, responseMessage?.alreadyEmail, {}, {}))

        const salt = await bcryptjs.genSaltSync(8)
        const hashPassword = await bcryptjs.hash(body.password, salt)
        delete body.password
        body.password = hashPassword
        let response: any = await new adminModel(body).save()
        console.log('response :>> ', response);
        const token = jwt.sign({
            _id: response._id,
            status: "Signup",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret)
        response = {
            ...response._doc,
            token,
        }
        return res.status(200).json(await apiResponse(200, responseMessage.signupSuccess, response, {}))
    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

export const login = async (req: Request, res: Response) => {
    let body = req.body
    try {
        let response = await adminModel.findOne({ email: body.email, isActive: true })
        if (!response) return res.status(400).json(await apiResponse(400, responseMessage.invalidUserPasswordEmail, {}, {}));

        const passwordMatch = await bcryptjs.compare(body.password, response.password)
        if (!passwordMatch) return res.status(400).json(await apiResponse(400, responseMessage.invalidUserPasswordEmail, {}, {}));
        const token = jwt.sign({
            _id: response._id,
            status: "Login",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret)
        response = {
            ...response._doc,
            token,
        }
        return res.status(200).json(await apiResponse(200, responseMessage.loginSuccess, response, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}