//first, server is created

const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.use('/employee', require('./routes/employeeRoutes'))
app.use('/attendance', require('./routes/attendanceRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

