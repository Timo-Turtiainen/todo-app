import { Box } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import TodoItem from './TodoItem'
import todoService from '../service/todoService'
import Notification from './Notification'

/**
 * TodoList component renders a list of todo items and manages their state.
 *
 * @param {Array<Object>} props.todos - The array of todo items.
 * @param {Function} props.setTodos - Function to update the todos array.
 * @param {Function} props.setDescriptionInputValue - Function to update the description input value.
 * @param {Function} props.setTaskInputValue - Function to update the task input value.
 * @param {Object} props.selectedTodo - The currently selected todo item.
 * @param {Function} props.setSelectedTodo - Function to set the selected todo item.
 * @param {Function} props.setPriority - Function to update the priority value.
 * @param {string} props.initialPriority - The initial priority value.
 * @param {Function} props.setButtonLabel - Function to update the button label text.
 * @param {Object} props.user - The current user object.
 * @returns {JSX.Element} The rendered TodoList component.
 */
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
}) {
  const user = useSelector((state) => state.user)
  const [open, setOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState(null)

  /**
   * Handles the checkbox state change for a todo item.
   *
   * @param {string} id - The id of the todo item.
   * @param {boolean} isComplete - The current completion state of the todo item.
   */
  async function handleCheckbox(id, isComplete) {
    /* find the todo object for updating */
    const todo = todos.find((element) => element.id === id)
    const updateTodoObject = {
      ...todo,
      complete: !todo.complete,
      endTime: Date.now(),
    }
    try {
      // Update todo
      const updatedTodo = await todoService.updateTodo(
        updateTodoObject,
        user.token
      )
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
      setSelectedTodo('')
      setButtonLabel('Lisää')
      setTaskInputValue('')
      setDescriptionInputValue('')
      setPriority(initialPriority)
    }
  }

  /**
   * Handles the task edit action.
   *
   * @param {Object} todo - The todo item to be edited.
   * @param {boolean} complete - The completion state of the todo item.
   */
  async function handleEditTask(todo, complete) {
    if (!complete) {
      setSelectedTodo(todo)
      setTaskInputValue(todo.task)
      setDescriptionInputValue(todo.description)
      setPriority(todo.priority)
      setButtonLabel('Päivitä')
    }
  }

  /**
   * Confirms the deletion of a todo item.
   */
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
    setSelectedTodo('')
  }

  /**
   * Initiates the delete action for a todo item.
   *
   * @param {string} id - The id of the todo item to be deleted.
   */
  function handleDelete(id) {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
      setTodoToDelete(todo)
      setOpen(true)
    }
  }

  /**
   * Closes the delete confirmation dialog.
   */
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
