import { useEffect } from 'react'
import { Box } from '@mui/material'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import LoginForm from './components/LoginForm'
import TodoPage from './components/TodoPage'
import loginService from './service/loginService'
import { setUser } from './reducers/userSlice'
import { initialTodos } from './reducers/todoSlice'
import SignupForm from './components/SignupForm'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.currentUser)
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
    } else {
      navigate('/login')
    }
  }, [user])

  return (
    <Box>
      <Header />

      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        {/* <Route path='/' element={<TodoPage />} /> */}
        <Route path='/' element={<TodoPage />} />
      </Routes>
    </Box>
    // <Box>
    //   <Header />

    //   {user ? (
    //     <>
    //       <Routes>
    //         <Route path='/' element={<TodoPage />} />
    //         <Route path='/login' element={<LoginForm />} />
    //         <Route path='/signup' element={<SignupForm />} />
    //       </Routes>
    //     </>
    //   ) : (

    //       <LoginForm />

    //   )}
    // </Box>
  )
}

export default App
