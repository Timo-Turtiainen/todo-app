import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'
import loginService from './service/loginService'
import { setUser } from './reducers/userSlice'
import { initialTodos } from './reducers/todoSlice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      loginService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initialTodos())
  }, [dispatch])

  return (
    <Box>
      <Header />
      {user ? (
        <>
          <Routes>
            <Route path='/' element={<TodoPage />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </>
      ) : (
        <LoginForm />
      )}
    </Box>
  )
}

export default App
