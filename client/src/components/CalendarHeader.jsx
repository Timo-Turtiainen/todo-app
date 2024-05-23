import { format } from 'date-fns'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { handleLocaleSwitch } from '../reducers/todoSlice'
import { useTranslation } from 'react-i18next'

function CalendarHeader({ currentMonth, currentWeek }) {
  const dateFormat = 'MMMM yyyy'
  const selectedLanguage = useSelector((state) => state.todo.selectedLanguage)
  const { t } = useTranslation()
  const week = t('week')
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        mb: '20px',
      }}
    >
      <Typography>
        {format(currentMonth, dateFormat, {
          locale: handleLocaleSwitch(selectedLanguage),
        })}
      </Typography>
      <Typography>{`${week}:${currentWeek} `}</Typography>
    </Box>
  )
}

export default CalendarHeader
