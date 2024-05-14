import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import todoService from './service/todoService'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'
import loginService from './service/loginService'
import { setUser } from './reducers/userSlice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      loginService.setToken(loggedUser.token)
    }
  }, [])
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
      <>
        <Routes>
          <Route
            path='/'
            element={<TodoPage user={user} todos={todos} setTodos={setTodos} />}
          />
          <Route path='/login' element={<LoginForm user={user} />} />
        </Routes>
      </>
    </Box>
  )
}

export default App
