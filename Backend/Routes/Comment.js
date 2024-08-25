import express from 'express'
import { getComments } from '../Controllers/Comment.js'

const router = express.Router()

router.get('/getComments', getComments)

export default router