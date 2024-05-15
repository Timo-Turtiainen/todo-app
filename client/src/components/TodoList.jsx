import { Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TodoItem from './TodoItem'
import Notification from './Notification'
import { deleteTodo, updateTodo } from '../reducers/todoSlice'

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
  setDescriptionInputValue,
  setTaskInputValue,
  selectedTodo,
  setSelectedTodo,
  setPriority,
  initialPriority,
  setButtonLabel,
}) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const todos = useSelector((state) => state.todo)
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
  async function handleCheckbox(id, isComplete) {
    /* find the todo object for updating */
    const todo = todos.find((element) => element.id === id)
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
      dispatch(deleteTodo(todoToDelete, user.token))
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

  /**
   * Fetches todos data from the service and updates the state.
   */

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
