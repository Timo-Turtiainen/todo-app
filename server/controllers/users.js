const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { username, password, email } = request.body
  console.log(username, password, email)
  // if (password.length < 3) {
  //   return response
  //     .status(400)
  //     .json({ error: 'password has to be at least 3 characters long' })
  // }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds) // Hash the password before saving into db

  const user = new User({
    username,
    passwordHash,
    email,
  })
  console.log('userRouter POST user', user)
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
