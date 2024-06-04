import {
  Container,
  Box,
  TextField,
  Button,
  styled,
  Typography,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { darkTheme } from './Theme'
import { setIsValidEmail, validateEmail } from '../reducers/userSlice'
import ResetPasswordEmail from './ResetPasswordEmail'

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

function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const isValidEmail = useSelector(state => state.users.isValidEmail)
  const user = useSelector(state => state.users.currentUser)

  useEffect(() => {
    if (isValidEmail) {
      navigate('/login')
      // add email send here
      dispatch(setIsValidEmail(false))
    }
  }, [isValidEmail, dispatch])

  function handleSubmit(e) {
    e.preventDefault()

    dispatch(validateEmail(email))
  }

  function handleCloseForm() {
    navigate('/login')
    clearTextField()
  }

  function clearTextField() {
    setEmail('')
  }
  return (
    <>
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
                Salasana unohtui?
              </Typography>
            </Box>
            <Typography paragraph sx={{ mt: '25px' }}>
              Lähetämme sähköpostin, jossa on ohjeet salasanan päivittämistä
              varten.
            </Typography>
            <Box>
              <CustomTextField
                variant='outlined'
                margin='normal'
                required
                label='Email'
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                fullWidth
              />
            </Box>
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
              Lähetä sähköposti
            </Button>
          </Box>
        </Container>
      </form>
    </>
  )
}

export default ForgotPassword
