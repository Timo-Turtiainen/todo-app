import React, { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  styled,
} from '@mui/material'
import { AccountCircle, Lock } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/userSlice'

/**
 * CustomTextField is a styled component that customizes the appearance of a TextField.
 *
 * @param {object} props.theme - The MUI theme object.
 * @returns {JSX.Element} A styled TextField component.
 */
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[500], // Default border color
      backgroundColor: 'inherit',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.activeBorder, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.activeBorder, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff', // Label color
    '&.Mui-focused': { color: '#fff' },
  },
}))

/**
 * LoginForm component renders a login form with styled text fields.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  /**
   * Handles the login process.
   *
   * @param {Event} e - The form submission event.
   */
  async function handleLogin(e) {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <Container
      maxWidth='xs'
      sx={{
        marginTop: 20,
        border: 1,
        borderRadius: 5,
        borderColor: '#fff',
        boxShadow: '-5px -5px 5px  #67fa5f',
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AccountCircle sx={{ fontSize: '70px', color: '#0bbd02' }} />
        <Typography component='h1' variant='h5' sx={{ mt: 2 }}>
          Kirjaudu
        </Typography>
        <Box component='form' sx={{ mt: 2, width: '100%' }} noValidate>
          <CustomTextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Käyttäjätunnus'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            variant='outlined'
            InputProps={{
              startAdornment: (
                <AccountCircle color='disabled' sx={{ marginRight: 1 }} />
              ),
            }}
          />
          <CustomTextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Salasana'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            variant='outlined'
            InputProps={{
              startAdornment: <Lock color='disabled' sx={{ marginRight: 1 }} />,
            }}
          />
          <Button
            fullWidth
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              border: 1,
              borderRadius: 2,
              backgroundColor: '#0bbd02',
              '&:hover': { backgroundColor: '#58ff4f' },
            }}
            onClick={handleLogin}
          >
            Kirjaudu sisään
          </Button>
          <Typography component='div' align='center'>
            <Link
              sx={{
                color: '#0bbd02',
                textDecorationColor: 'gray',
                '&:hover': { textDecorationColor: '#0bbd02' },
              }}
              href='#'
              variant='body2'
            >
              Unohtuiko salasana?
            </Link>
            {/** ADD Link "create " */}
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
