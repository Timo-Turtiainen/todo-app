import { useState } from 'react'
import { getWeek } from 'date-fns'

import { Box } from '@mui/material'

import CalendarHeader from './CalendarHeader'
import CalendarDays from './CalendarDays'

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth))

  return (
    <Box>
      <CalendarHeader currentWeek={currentWeek} currentMonth={currentMonth} />
      <CalendarDays
        currentMonth={currentMonth}
        setCurrentWeek={setCurrentWeek}
        setCurrentMonth={setCurrentMonth}
      />
    </Box>
  )
}

export default Calendar
