import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TodoItem from './TodoItem'
import Notification from './Notification'
import {
  deleteTodo,
  updateTodo,
  setDescription,
  setTaskInput,
  setSelectedTask,
  setPriority,
} from '../reducers/todoSlice'

/**
 * TodoList component renders a list of todo items and manages their state.
 *
 * @param {Function} props.setButtonLabel - Function to update the button label text.
 * @returns {JSX.Element} The rendered TodoList component.
 */
function TodoList({ setButtonLabel }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const todos = useSelector((state) => state.todo.todos)

  const [sortedTodos, setSortedTodos] = useState([])
  const [open, setOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState(null)

  /**
   * Sorts todos by completion status and priority.
   */
  useEffect(() => {
    sortTodosByCompleteAndPriority()
  }, [todos]) // Sort todos whenever todos state changes

  /**
   * Function to sort todos by completion status and priority.
   */
  function sortTodosByCompleteAndPriority() {
    const completeAndPriorityOrder = [...todos].sort((a, b) => {
      // Compare completion status first
      if (a.complete && !b.complete) {
        return 1 // a (completed) should come after b (not completed)
      }
      if (!a.complete && b.complete) {
        return -1 // a (not completed) should come before b (completed)
      }

      // If both have the same completion status, compare by priority
      const priorityOrder = { Korkea: 1, Normaali: 2, Matala: 3 }
      const priorityA = priorityOrder[a.priority]
      const priorityB = priorityOrder[b.priority]

      return priorityA - priorityB // Compare priorities based on order
    })
    setSortedTodos(completeAndPriorityOrder)
  }
  /**
   * Handles the checkbox state change for a todo item.
   *
   * @param {string} id - The id of the todo item.
   * @param {boolean} isComplete - The current completion state of the todo item.
   */
  async function handleCheckbox(todo) {
    const updateTodoObject = {
      ...todo,
      complete: !todo.complete,
      endTime: Date.now(),
      user: user.id,
    }
    try {
      // Update todo
      dispatch(updateTodo(updateTodoObject, user.token))
    } catch (error) {
      console.error('Error creating todo:', error.message)
    }

    if (!todo.complete) {
      cleanUp()
    }
  }

  /**
   * Handles the task edit action.
   *
   * @param {Object} todo - The todo item to be edited.
   */
  async function handleEditTask(todo) {
    if (!todo.complete) {
      dispatch(setSelectedTask(todo.task))
      dispatch(setTaskInput(todo.task))
      dispatch(setDescription(todo.description))
      dispatch(setPriority(todo.priority))
      setButtonLabel('Päivitä')
    }
  }

  /**
   * Confirms the deletion of a todo item.
   */
  async function confirmDelete() {
    if (todoToDelete) {
      dispatch(deleteTodo(todoToDelete, user.token))
      setOpen(false)
      setTodoToDelete(null)
    }
    cleanUp()
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

  /**
   * Handles the clearing
   */
  function cleanUp() {
    setButtonLabel('Lisää')
    dispatch(setTaskInput(''))
    dispatch(setDescription(''))
    dispatch(setSelectedTask(null))
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
        {sortedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            // selectedTodo={selectedTodo}
            // setSelectedTodo={setSelectedTodo}
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
