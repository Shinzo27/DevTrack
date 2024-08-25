import express from 'express'
import { getStats, getUserInfo, logout, signin, signup, userDetails } from '../Controllers/User.js'
import {authenticateJwt} from '../Middlewares/Auth.js'
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/getUserInfo',authenticateJwt, getUserInfo)
router.get('/logout', authenticateJwt, logout)
router.get('/me', authenticateJwt, userDetails)
router.get('/getStats',authenticateJwt, getStats)

export default router