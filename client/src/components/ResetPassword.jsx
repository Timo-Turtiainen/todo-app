import {
  Box,
  Container,
  IconButton,
  Typography,
  TextField,
  styled,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../reducers/userSlice'

import { darkTheme } from './Theme'

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[500], // Default border color
      backgroundColor: 'inherit',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff', // Label color
    '&.Mui-focused': { color: darkTheme.palette.text.primary },
  },
}))

const ResetPassword = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.currentUser)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (
      password.includes(confirmPassword) &&
      confirmPassword.includes(password)
    ) {
      dispatch(changePassword(user, password))
    }
  }

  function handleCloseForm() {
    navigate('/login')
    clearTextField()
  }

  function clearTextField() {
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
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
          width: '400px',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              size='medium'
              aria-label='close'
              onClick={() => handleCloseForm()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ mb: '20px', mx: '20px' }}>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center' }}
              variant='h4'>
              Reset Password
            </Typography>
          </Box>
          <CustomTextField
            variant='outlined'
            margin='normal'
            required
            label='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
          />
          <CustomTextField
            variant='outlined'
            margin='normal'
            required
            label='Confirm Password'
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            fullWidth
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
            Save changes
          </Button>
        </Box>
      </Container>
    </form>
  )
}

export default ResetPassword
