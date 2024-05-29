import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  styled,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

import { darkTheme } from './Theme'
import { createNewUser, loginUser } from '../reducers/userSlice'
import Notification from '../components/Notification'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationSlice'

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[500], // Default border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary, // Label color
    '&.Mui-focused': { color: theme.palette.text.primary },
  },
}))

function SignupForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const newUser = {
      email,
      username,
      password,
    }
    try {
      dispatch(createNewUser(newUser))
    } catch (error) {
      console.log('signupform', error)
      dispatch(setNotification('error', true, 2))
    }
    // clearTextField()
  }

  function clearTextField() {
    setEmail('')
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          border: 1,
          borderRadius: 5,
          borderColor: darkTheme.palette.primary.contrastText,
          boxShadow: `-5px -5px 5px  ${darkTheme.palette.background.boxShadow}`,

          width: '60%',
        }}>
        <Box sx={{ mb: '20px', mt: '50px', mx: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Typography variant='h3'>{t('signup')}</Typography>
            <IconButton aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Box>
          <CustomTextField
            fullWidth
            variant='standard'
            margin='normal'
            required
            label='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <CustomTextField
            fullWidth
            variant='standard'
            margin='normal'
            required
            label='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <CustomTextField
            fullWidth
            variant='standard'
            margin='normal'
            required
            label='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button
            variant='contained'
            fullWidth
            type='submit'
            sx={{
              my: '30px',
              backgroundColor: darkTheme.palette.primary.light,
              '&:hover': {
                backgroundColor: darkTheme.palette.primary.dark,
                color: darkTheme.palette.text.secondary,
              },
            }}>
            Sign Up
          </Button>
        </Box>

        {/* <Button
          variant='contained'
          sx={{ backgroundColor: darkTheme.palette.primary.light }}>
          Cancel
        </Button> */}
        <Notification />
      </Container>
    </form>
  )
}

export default SignupForm
