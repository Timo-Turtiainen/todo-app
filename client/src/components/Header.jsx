import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import loginService from '../service/loginService'
import { setUser } from '../reducers/userSlice'

/**
 * Header component renders the header of the Todo App.
 * It displays the app title and a button for login/logout.
 *
 * @param {Object} props.user - The current logged-in user.
 * @param {Function} props.setUser - Function to update the user state.
 * @returns {JSX.Element} The rendered Header component.
 */
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  /**
   * Function to handle user sign-out.
   * Clears user data and navigates back to the login page.
   */
  function signOut() {
    dispatch(setUser(null))
    loginService.setToken('')
    window.localStorage.clear()
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Typography>{user ? user.username : null}</Typography>
          <Button
            onClick={() => signOut()}
            color='inherit'
            sx={{ '&:hover': { color: '#58ff4f' } }}
          >
            Ulos
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
