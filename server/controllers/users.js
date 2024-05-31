const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/verify-email', async (request, response) => {
  const { email } = request.body

  try {
    const user = await User.findOne({ email })

    if (user) {
      return response.status(200).json(user)
    } else {
      return response.status(401).json({ error: 'Invalid email address' })
    }
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.post('/', async (request, response) => {
  const { username, password, email } = request.body

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
    return response.status(400).json(error)
  }
})

module.exports = usersRouter
