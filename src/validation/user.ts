import * as Joi from "joi"
import { apiResponse } from '../common'
import { Request, Response } from 'express'

export const signUp = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        firstName: Joi.string().error(new Error('firstName is string!')),
        lastName: Joi.string().error(new Error('lastName is string!')),
        phoneNumber: Joi.string().error(new Error('phoneNumber is string!')),
        email: Joi.string().error(new Error('email is string!')),
        username: Joi.string().error(new Error('username is string!')),
        password: Joi.string().error(new Error('password is string!')),
    })
    schema.validateAsync(req.body).then(async result => {
        // console.log(result, "---------------------------result");
        return next()
    }).catch(async error => { res.status(400).json(await apiResponse(400, error.message, {}, {})) })
}

export const login = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        email: Joi.string().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
    })
    schema.validateAsync(req.body).then(async result => {
        // console.log(result, "---------------------------result");
        return next()
    }).catch(async error => { res.status(400).json(await apiResponse(400, error.message, {}, {})) })
}
