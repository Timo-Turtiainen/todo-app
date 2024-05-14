import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import loginService from '../service/loginService'
import { useNavigate } from 'react-router-dom'
/**
 * Header component renders the header of the Todo App.
 * It displays the app title and a button for login.
 * @returns {JSX.Element} The rendered Header component.
 */
function Header({ user, setUser }) {
  const navigate = useNavigate()

  function signOut() {
    setUser('')
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
          <Typography>{user.username}</Typography>
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
