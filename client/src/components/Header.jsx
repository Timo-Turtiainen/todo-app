import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'

/**
 * Header component renders the header of the Todo App.
 * It displays the app title and a button for login.
 * @returns {JSX.Element} The rendered Header component.
 */
function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color='inherit' sx={{ '&:hover': { color: '#58ff4f' } }}>
            Kirjaudu
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
