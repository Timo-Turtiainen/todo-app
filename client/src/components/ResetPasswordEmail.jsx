import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ResetPasswordEmail() {
  // Find out how user can be display
  const user = useSelector(state => state.users.currentUser)
  // if (!user) {
  //   return
  // }
  const mockToken = '234yuhrifsjdfhw8p3h2f2'

  return (
    <Html>
      <Container>
        <Typography variant='h3'>Reset your Todo-App password</Typography>
        <Typography paragraph>{}</Typography>
        <Typography paragraph>
          We're sending you this email because you requested a password reset.
          Click on this button to create a new password.
        </Typography>
        <Link to={`/reset-password?user=${user}&token=${mockToken}`}>
          Create new Password
        </Link>
      </Container>
    </Html>
  )
}

export default ResetPasswordEmail
