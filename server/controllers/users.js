require('dotenv').config()
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

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

usersRouter.post('/verify-email', async (request, response) => {
  const { email } = request.body

  try {
    const user = await User.findOne({ email })
    console.log('controllers user:', user)

    if (user) {
      return response.status(200).send({
        username: user.username,

        email: user.email,
      })
    } else {
      return response.status(401).json({ error: 'Invalid email address' })
    }
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error' })
  }
})

usersRouter.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  let mailOptions = {
    from: process.env.GMAIL,
    to,
    subject,
    html: text,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).send('Email sent successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error sending email')
  }
})

usersRouter.post('/reset-password', async (request, response) => {
  const param = request.params
  console.log(param)
  const { username, password, email } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.findone({ username })
  user.passwordHash = passwordHash
  await user.save()
  response.json(user)
})

module.exports = usersRouter
