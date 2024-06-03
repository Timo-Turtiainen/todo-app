import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Routes, Route, useNavigate, redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'
import loginService from './service/loginService'
import { setUser } from './reducers/userSlice'
import { initialTodos } from './reducers/todoSlice'
import SignupForm from './components/SignupForm'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      loginService.setToken(loggedUser.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initialTodos(user.token))
      navigate('/')
    }
  }, [user])

  return (
    <Box>
      <Header />

      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/verify-email' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<TodoPage />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default App
