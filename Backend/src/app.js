import express from "express"
import cors from 'cors';
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
  origin: process.env.CORS_ORIGIN, // we have already include it in .env  
  credentials: true, // to allow cookie from frontend
}));

// Handling the req and res using middlewares

app.use(express.json({limit : '50mb'})) 
app.use(express.urlencoded({extended : true})) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // for serving static files
app.use(cookieParser())