const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { username, password, email } = request.body
  console.log('userRouter', username, password, email)
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

  try {
    const savedUser = await user.save()
    return response.status(201).json(savedUser)
  } catch (error) {
    console.log('user server', error)
    if (error.message.includes('E11000 duplicate key error'))
      return response.status(500).json(response)
  }
})

module.exports = usersRouter
