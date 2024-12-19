import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { connectDB } from './Config/db.js';
connectDB()
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRoute from './Routes/auth.route.js';
import messageRoute from './Routes/message.route.js';
import { app, server } from './Config/socket.js'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)

const port = process.env.PORT
server.listen(port, () => console.log(`server is running on http://localhost:${port}/`))