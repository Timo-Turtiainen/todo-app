import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { darkTheme } from './Theme'

function Notification() {
  const notification = useSelector(state => state.notification)

  if (!notification.content) {
    return null
  }

  return (
    <Typography paragraph sx={{ color: darkTheme.palette.primary.dark }}>
      {notification.content}
    </Typography>
  )
}

export default Notification
