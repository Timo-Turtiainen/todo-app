import { format } from 'date-fns'
import { fi } from 'date-fns/locale'
import { Box, Typography } from '@mui/material'

function CalendarHeader({ currentMonth, currentWeek }) {
  const dateFormat = 'MMMM yyyy'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        mb: '20px',
      }}>
      <Typography>
        {format(currentMonth, dateFormat, { locale: fi })}
      </Typography>
      <Typography>{`vko ${currentWeek} `}</Typography>
    </Box>
  )
}

export default CalendarHeader
