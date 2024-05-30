const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const todoRouter = require('./controllers/todos')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.errorHandler)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/todos', todoRouter)

module.exports = app
