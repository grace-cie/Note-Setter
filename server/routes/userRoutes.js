import express from 'express'
export const router = express.Router()

//import funcs controller
import {
     registerUser,
     loginUser,
     getMe
 } from '../controllers/userController.js'



router.post('/', registerUser)
router.post('/login', loginUser)

import protect from '../middleware/authMiddleware.js'
router.get('/me', protect, getMe) //protected if no token



export default router