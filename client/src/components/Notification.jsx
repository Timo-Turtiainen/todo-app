import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'

function Notification() {
  const notification = useSelector(state => state.notification)

  if (!notification.content) {
    return null
  }

  return (
    <Typography paragraph='h3' color='white'>
      {notification.content}
    </Typography>
  )
}

export default Notification
