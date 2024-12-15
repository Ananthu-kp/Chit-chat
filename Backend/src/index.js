import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { connectDB } from './Config/db.js';
connectDB()
import cookieParser from 'cookie-parser'
import authRoute from './Routes/auth.route.js';

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)

const port = process.env.PORT
app.listen(port, () => console.log(`server is running on http://localhost:${port}/`))