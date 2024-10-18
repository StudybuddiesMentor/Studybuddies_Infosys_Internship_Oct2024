import express from 'express'

import cookieParser from 'cookie-parser'

import cors from 'cors'

const app = express()


app.uses(cors({
    origin : process.env.CORS_ORIGIN ,
    Credential: true
}))

app.use(cookieParser())
app.use(express.json({limit : '50mb'})) 
app.use(express.urlencoded({extended : true})) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // for serving static files
