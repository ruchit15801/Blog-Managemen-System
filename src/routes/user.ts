import express from 'express'
import { userController } from '../controller'
import { userJWT } from '../helper'
import * as validation from '../validation'
const router = express.Router()

// Authentication
router.post('/signup', validation.signUp, userController.signUp)
router.post('/login', validation.login, userController.login)

router.use(userJWT)
// Category
router.get('/category', userController.getCategory)

// Post
router.post('/post', userController.addPost)
router.get('/post', userController.getPost)
router.put('/post', userController.updatePost)
router.delete('/post/:id', userController.deletePost)


export const userRoutes = router