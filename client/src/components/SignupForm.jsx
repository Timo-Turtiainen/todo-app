import { useState, useEffect } from 'react'
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
import { createNewUser, setIsUserSaved } from '../reducers/userSlice'
import Notification from '../components/Notification'

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
  const isUserSaved = useSelector((state) => state.users.isUserSaved)

  const navigate = useNavigate()

  useEffect(() => {
    if (isUserSaved) {
      navigate('/login') // Navigate to login page or some other page on success
      clearTextField()
      dispatch(setIsUserSaved(false)) // Reset the isUserSaved state
    }
  }, [isUserSaved, navigate, dispatch])

  function handleSubmit(e) {
    e.preventDefault()

    const newUser = {
      email,
      username,
      password,
    }

    dispatch(createNewUser(newUser, t))

    if (isUserSaved) {
      handleCloseForm()
    }
  }
  function handleCloseForm() {
    navigate('/login')
    clearTextField()
  }

  function clearTextField() {
    setEmail('')
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
          border: 1,
          borderRadius: 5,
          borderColor: darkTheme.palette.primary.contrastText,
          boxShadow: `-5px -5px 5px  ${darkTheme.palette.background.boxShadow}`,

          width: '60%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size='medium'
              aria-label='close'
              onClick={() => handleCloseForm()}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: '20px', mx: '20px' }}>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center', mb: '25px' }}
              variant='h3'
            >
              {t('signup')}
            </Typography>
            <CustomTextField
              fullWidth
              variant='standard'
              margin='normal'
              required
              label={t('email')}
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <CustomTextField
              fullWidth
              variant='standard'
              margin='normal'
              required
              label={t('username')}
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <CustomTextField
              fullWidth
              variant='standard'
              margin='normal'
              required
              type='password'
              label={t('password')}
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
              }}
            >
              {t('signup')}
            </Button>
          </Box>
          {/* <Button
          variant='contained'
          sx={{ backgroundColor: darkTheme.palette.primary.light }}>
          Cancel
        </Button> */}
          <Notification />
        </Box>
      </Container>
    </form>
  )
}

export default SignupForm
