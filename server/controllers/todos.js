const todoRouter = require('express').Router()
const Todo = require('../models/todo')
const middleware = require('../utils/middleware')

/* GET all Todos */
todoRouter.get('/', async (request, response) => {
  const todos = await Todo.find({})
  response.json(todos)
})

/* Post new Todo */
todoRouter.post('/', middleware.userExtractor, async (request, response) => {
  const {
    task,
    description,
    priority,
    startTime,
    endTime,
    complete,
    hoverered,
  } = request.body

  try {
    const todo = new Todo({
      task,
      description,
      priority,
      startTime,
      endTime,
      complete,
      hoverered,
      user: request.user._id,
    })

    const savedTodo = await todo.save()
    request.user.todos = request.user.todos.concat(savedTodo._id)

    await request.user.save()
    await savedTodo.populate('user', { username: 1 })

    response.status(201).json(savedTodo)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})
/* Update Todo */
todoRouter.put('/:id', async (request, response) => {
  const todo = request.body
  const updateTodo = await Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
  })
  response.status(200).json(updateTodo)
})

/* Delete Todo */
todoRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const todo = await Todo.findById(request.params.id)
    if (todo.user._id.toString() === request.user._id.toString()) {
      await Todo.findByIdAndDelete(request.params.id)
      response.status(204).end()
    }
  }
)
module.exports = todoRouter
