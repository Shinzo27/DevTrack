import express from 'express'
import { addTasks, deleteTask, getTasks, getTasksOfUser, updateTaskStatus } from '../Controllers/Task.js'
import { authenticateJwt, projectRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getTasks/:projectId', getTasks)
router.post('/addTask', authenticateJwt, projectRole('Product Manager'), addTasks)
router.put('/updateTaskStatus/:projectId/tasks/:taskId', authenticateJwt, updateTaskStatus)
router.get('/getTasksOfUser', authenticateJwt, getTasksOfUser)
router.delete('/deleteTask/:projectId/tasks/:taskId', authenticateJwt, projectRole('Product Manager'), deleteTask)

export default router