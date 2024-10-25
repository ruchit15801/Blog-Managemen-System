"use strict"
import express, { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import http from 'http';
import { mongooseConnection } from './database'
import { router } from './routes'

const app = express();

app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))


const bad_gateway = (req, res) => { return res.status(502).json({ status: 502, message: "blog-management Backend API Bad Gateway" }) }
const home = (req, res) => { return res.status(200).json({ status: 200, message: "blog-management Backend Server Running" }) }

app.get('/', home);
app.use(mongooseConnection)
app.use(router)
app.use('*', bad_gateway);


let server = new http.Server(app);
export default server;
