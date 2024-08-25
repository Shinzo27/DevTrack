import express from 'express'
import { addTasks, getTasks, getTasksOfUser, updateTaskStatus } from '../Controllers/Task.js'
import { authenticateJwt, projectRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getTasks/:projectId', getTasks)
router.post('/addTask', authenticateJwt, projectRole('Product Manager'), addTasks)
router.put('/updateTaskStatus/:projectId/tasks/:taskId', authenticateJwt, updateTaskStatus)
router.get('/getTasksOfUser', authenticateJwt, getTasksOfUser)

export default router