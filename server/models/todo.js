const mongoose = require('mongoose')

const todoScema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: String,
  priority: String,
  startTime: Date,
  endTime: Date,
  complete: Boolean,
  hoverered: Boolean,
})

todoScema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Todo', todoScema)
