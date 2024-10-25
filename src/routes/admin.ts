import express from 'express'
import { adminController } from '../controller'
import { adminJWT } from '../helper'
import * as validation from '../validation'
const router = express.Router()

// Authentication
router.post('/signup', validation.signUp, adminController.signUp)
router.post('/login', validation.login, adminController.login)

router.use(adminJWT)

// Post
router.get('/post', adminController.getPost)
router.put('/post', adminController.updatePost)
router.delete('/post/:id', adminController.deletePost)


// User
router.get('/user', adminController.getUser)
router.put('/user', adminController.updateUser)
router.delete('/user/:id', adminController.deleteUser)


// Category
router.post('/category', adminController.addCategory)
router.get('/category', adminController.getCategory)
router.put('/category', adminController.updateCategory)
router.delete('/category/:id', adminController.deleteCategory)


export const adminRoutes = router