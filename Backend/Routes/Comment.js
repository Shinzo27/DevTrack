import express from 'express'
import { addComments, getComments } from '../Controllers/Comment.js'

const router = express.Router()

router.get('/getComments/:projectId', getComments)
router.post('/addComment', addComments)

export default router