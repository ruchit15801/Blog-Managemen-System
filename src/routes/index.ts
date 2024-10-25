import { Request, Router, Response } from 'express'
import { userRoutes } from './user'
import { adminRoutes } from './admin'

const router = Router()

router.use('/user', userRoutes)
router.use('/admin', adminRoutes)

export { router }   