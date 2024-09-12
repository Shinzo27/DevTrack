import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './Middlewares/ErrorHandler.js'
import userRouter from './Routes/User.js'
import projectRouter from './Routes/Project.js'
import taskRouter from './Routes/Task.js'
import commentRouter from './Routes/Comment.js'
import { Server } from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true
    }
})

const PORT = process.env.PORT || 8000

config({path: './Config/.env'})

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDb Connected"))

app.use((req, res, next) =>{
    req.io = io;
    next();
})

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/project', projectRouter)
app.use('/api/v1/task', taskRouter)
app.use('/api/v1/comment', commentRouter)

io.on('connection', (socket) => {
    
    socket.on('newComment', (data) => {
        io.emit('newComment', data)
    })

})

app.use(errorMiddleware)

server.listen(PORT, ()=>{console.log("Server listening on port: "+ PORT)})