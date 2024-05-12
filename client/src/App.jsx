import './App.css'
import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'

import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import todoService from './service/todoService'
import TaskCounter from './components/TaskCounter'
import LoginForm from './components/LoginForm'

function App() {
  const initialPriority = 'Normaali'
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState('')
  const [taskInputValue, setTaskInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)
  const [buttonLabel, setButtonLabel] = useState('Lisää')

  /**
   * Fetches todos data from the service and updates the state.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTodos = await todoService.getAllTodos()
        setTodos(fetchedTodos)
      } catch (error) {
        console.error('Error fetching todos:', error)
      }
    }
    fetchData()
  }, [])

  /**
   * Sorts todos by completion status and priority.
   */
  useEffect(() => {
    sortTodosByCompleteAndPriority()
  }, [todos]) // Sort todos whenever todos state changes

  /**
   * Function to sort todos by completion status and priority.
   */
  const sortTodosByCompleteAndPriority = () => {
    const sortedTodos = [...todos].sort((a, b) => {
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

    setTodos(sortedTodos)
  }

  return (
    <Box>
      <Header />
      <TodoForm
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        todos={todos}
        setTodos={setTodos}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        initialPriority={initialPriority}
        priority={priority}
        setPriority={setPriority}
        buttonLabel={buttonLabel}
        setButtonLabel={setButtonLabel}
      />
      <TaskCounter todos={todos} />
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          setTodos={setTodos}
          taskInputValue={taskInputValue}
          setTaskInputValue={setTaskInputValue}
          descriptionInputValue={descriptionInputValue}
          setDescriptionInputValue={setDescriptionInputValue}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          priority={priority}
          setPriority={setPriority}
          initialPriority={initialPriority}
          setButtonLabel={setButtonLabel}
        />
      ) : (
        <Typography mx={15}>Sinulla ei ole tehtäviä</Typography>
      )}
      <LoginForm />
    </Box>
  )
}

export default App
