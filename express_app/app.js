// external dependencies
const express = require('express')
const bodyParser = require('body-parser')

// authentication middlware
const { authenticateToken } = require('./middleware/authMiddleware')

// internal routes
const authRoutes = require('./routes/authRoutes')
const protectedRoutes = require('./routes/userRoutes')

// configuration constants
require('dotenv').config()

const port = process.env.PORT

// creating and configurating the Express App
const app = express() 
app.use(bodyParser.json())

app.use('/auth', authRoutes) // Mount auth routes under /auth path
app.use('/protected', authenticateToken, protectedRoutes) // Mount protected routes under /protected with authentication middleware

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})