import { Box } from '@mui/material'
import { useState } from 'react'

import TodoItem from './TodoItem'
import todoService from '../service/todoService'
import Notification from './Notification'

function TodoList({
  todos,
  setTodos,
  setDescriptionInputValue,
  setTaskInputValue,
  selectedTodo,
  setSelectedTodo,
  setPriority,
  initialPriority,
  setButtonLabel,
  user,
}) {
  const [open, setOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState(null)

  async function handleCheckbox(id, isComplete) {
    /* find the todo object for updating */
    const todo = todos.find((element) => element.id === id)
    const updateTodoObject = {
      ...todo,
      complete: !todo.complete,
      endTime: Date.now(),
    }
    try {
      const updatedTodo = await todoService.updateTodo(updateTodoObject)
      setTodos(
        todos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo
          } else {
            return todo
          }
        })
      )
    } catch (error) {
      console.error('Error creating todo:', error.message)
    }

    if (!isComplete) {
      setSelectedTodo(null)
      setButtonLabel('Lisää')
      setTaskInputValue('')
      setDescriptionInputValue('')
      setPriority(initialPriority)
    }
  }

  async function handleEditTask(todo, complete) {
    if (!complete) {
      setSelectedTodo(todo)
      setTaskInputValue(todo.task)
      setDescriptionInputValue(todo.description)
      setPriority(todo.priority)
      setButtonLabel('Päivitä')
    }
  }
  async function confirmDelete() {
    if (todoToDelete) {
      setTodos(todos.filter((todo) => todo.id !== todoToDelete.id))
      await todoService.deleteTodoByID(todoToDelete.id)
      setOpen(false)
      setTodoToDelete(null)
    }
    setButtonLabel('Lisää')
    setTaskInputValue('')
    setDescriptionInputValue('')
    setPriority(initialPriority)
    setSelectedTodo(null)
  }

  function handleDelete(id) {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
      setTodoToDelete(todo)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTodoToDelete(null)
  }

  return (
    <>
      <Notification
        open={open}
        handleClose={handleClose}
        confirmDelete={confirmDelete}
        todoToDelete={todoToDelete}
      />
      <Box display={'flex'} flexDirection={'column'} my={4} px={5}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
            handleCheckbox={handleCheckbox}
            handleEditTask={handleEditTask}
            handleDelete={handleDelete}
          />
        ))}
      </Box>
    </>
  )
}

export default TodoList
