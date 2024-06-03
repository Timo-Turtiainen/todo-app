import { Container, Typography, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ResetPasswordEmail({ user }) {
  const navigate = useNavigate()

  if (!user) {
    return null
  }

  return (
    <Container>
      <Typography variant='h3'>Reset your Todo-App password</Typography>
      <Typography paragraph>`Hi ${user.username} ,`</Typography>
      <Typography paragraph>
        We're sending you this email because you requested a password reset.
        Click on this button to create a new password.
      </Typography>
      <Button onClick={() => navigate('/reset-password')}>
        Create new Password
      </Button>
    </Container>
  )
}

export default ResetPasswordEmail
