const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // minLength: 8,
  },
  passwordHash: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  ],
})
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
