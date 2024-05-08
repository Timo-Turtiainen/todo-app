import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@mui/material'
import { MdMenu } from 'react-icons/md'

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}>
            <MdMenu />
          </IconButton> */}
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
