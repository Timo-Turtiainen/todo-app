import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import loginService from '../service/loginService'
import { setUser } from '../reducers/userSlice'
import { darkTheme } from './Theme'
import LanguageToggle from './LanguageToggle'
import TaskFilter from './TaskFilter'
import SearchBar from './SearchBar'

/**
 * Header component renders the header of the Todo App.
 * It displays the app title and a button for login/logout.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const user = useSelector(state => state.user)

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
          <SearchBar />
          <TaskFilter />
          <Typography sx={{ mx: 2 }}>{user ? user.username : null}</Typography>

          <LanguageToggle />
          <Button
            onClick={() => signOut()}
            color='inherit'
            sx={{
              '&:hover': { color: darkTheme.palette.primary.dark },
              mx: 2,
            }}>
            {t('logout')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
