import config from 'config';
import mongoose from 'mongoose';
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const dbUrl: any = process.env.DB_URL
console.log(dbUrl);
const mongooseConnection = express()
mongoose.connect(
    dbUrl,
).then(() => console.log('Database successfully connected')).catch(err => console.log(err));
export { mongooseConnection }