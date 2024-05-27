import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isSameDay } from 'date-fns'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  const user = useSelector(state => state.user)
  const todos = useSelector(state => state.todo.todos)
  const timestamp = useSelector(state => state.todo.selectedDay)
  const selectedDay = new Date(timestamp)
  const filteredByPending = useSelector(state => state.todo.filteredByPending)
  const filteredByCompleted = useSelector(
    state => state.todo.filteredByCompleted
  )
  const searchText = useSelector(state => state.todo.searchText)

  const [sortedTodos, setSortedTodos] = useState([])
  const [open, setOpen] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState(null)

  const message = t('noTaskMessage')

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
      const priorityOrder = { high: 1, normal: 2, low: 3 }
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
    const todo = todos.find(todo => todo.id === id)
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

  const tasksForSelectedDay = sortedTodos.filter(todo =>
    isSameDay(selectedDay, todo.startTime)
  )

  return (
    <>
      <Notification
        open={open}
        handleClose={handleClose}
        confirmDelete={confirmDelete}
        todoToDelete={todoToDelete}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '1220px',
          my: 4,
          px: 5,
        }}>
        {searchText.length > 0 ? (
          sortedTodos
            .filter(
              todo =>
                todo.task.toLowerCase().includes(searchText.toLowerCase()) ||
                todo.description
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
            )
            .map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                handleCheckbox={handleCheckbox}
                handleEditTask={handleEditTask}
                handleDelete={handleDelete}
              />
            ))
        ) : (
          <>
            {filteredByPending || filteredByCompleted ? (
              sortedTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleCheckbox={handleCheckbox}
                  handleEditTask={handleEditTask}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <>
                {tasksForSelectedDay.length > 0 ? (
                  tasksForSelectedDay.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      handleCheckbox={handleCheckbox}
                      handleEditTask={handleEditTask}
                      handleDelete={handleDelete}
                    />
                  ))
                ) : (
                  <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    my={5}>
                    <Typography
                      sx={{
                        color: theme => theme.palette.primary.dark,
                        fontSize: '25px',
                      }}>
                      {message}
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default TodoList
