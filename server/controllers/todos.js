const todoRouter = require('express').Router()
const Todo = require('../models/todo')

/* GET all Todos */
todoRouter.get('/', async (request, response) => {
  const todos = await Todo.find({})
  response.json(todos)
})

/* Post new Todo */
todoRouter.post('/', async (request, response) => {
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
    })

    const savedTodo = await todo.save()
    response.status(201).json(savedTodo)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})
/* Update Todo */
todoRouter.put('/:id', async (request, response) => {
  const todo = request.body
  console.log(todo)
  const updateTodo = await Todo.findByIdAndUpdate(request.params.id, todo, {
    new: true,
  })
  response.status(200).json(updateTodo)
})

/* Delete Todo */
todoRouter.delete('/:id', async (request, response) => {
  await Todo.findByIdAndDelete(request.params.id)
  response.status(204).end()
})
module.exports = todoRouter
