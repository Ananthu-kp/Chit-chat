import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { connectDB } from './Config/db.js';
connectDB()
import cookieParser from 'cookie-parser'
import authRoute from './Routes/auth.route.js';
import messageRoute from './Routes/message.route.js';

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)

const port = process.env.PORT
app.listen(port, () => console.log(`server is running on http://localhost:${port}/`))