import React from 'react'
import {
  format,
  startOfWeek,
  addDays,
  getWeek,
  addWeeks,
  subWeeks,
  isSameDay,
} from 'date-fns'
import { fi } from 'date-fns/locale'
import { Box, Typography, Button, IconButton, Badge } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useDispatch, useSelector } from 'react-redux'

import { setSelectedDay } from '../reducers/todoSlice'
import { darkTheme } from './Theme'

function CalendarDays({ currentMonth, setCurrentWeek, setCurrentMonth }) {
  const dispatch = useDispatch()
  const timestamp = useSelector(state => state.todo.selectedDay)
  const selectedDay = new Date(timestamp)
  const todos = useSelector(state => state.todo.todos)

  function handleDayPress(day) {
    dispatch(setSelectedDay(day.getTime()))
  }

  function handleWeekChange(btnType) {
    if (btnType === 'prev') {
      setCurrentMonth(subWeeks(currentMonth, 1))
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)))
    }
    if (btnType === 'next') {
      setCurrentMonth(addWeeks(currentMonth, 1))
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)))
    }
  }

  const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 })

  const dateFormat = 'EEEEEE'
  const dayFormat = 'dd'
  const days = []

  for (let i = 0; i < 7; i++) {
    const day = addDays(startDate, i)
    const initialDay = isSameDay(selectedDay, day)

    const daysTasks = todos.filter(
      todo => isSameDay(todo.startTime, day) && !todo.complete
    )

    // Task count per day
    const taskCount = daysTasks.length
    days.push(
      <Badge
        key={i}
        badgeContent={taskCount}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          marginRight: '20px',
          '& .MuiBadge-badge': {
            backgroundColor: initialDay
              ? darkTheme.palette.primary.light
              : darkTheme.palette.primary.dark,
            color: darkTheme.palette.text.secondary,
          },
        }}>
        <Box>
          <Button
            variant='contained'
            sx={{
              height: '54px',

              backgroundColor: initialDay
                ? darkTheme.palette.primary.dark
                : darkTheme.palette.background.paper,
              color: initialDay
                ? darkTheme.palette.text.secondary
                : darkTheme.palette.text.primary,

              '&:hover': {
                backgroundColor: darkTheme.palette.primary.dark,
                color: darkTheme.palette.text.secondary,
              },
              '&:focus': {
                backgroundColor: darkTheme.palette.primary.dark,
                color: darkTheme.palette.text.secondary,
              },
            }}
            onClick={() => handleDayPress(day)}>
            <Box display={'flex'} flexDirection={'column'}>
              <Typography>{format(day, dateFormat, { locale: fi })}</Typography>
              <Typography>{format(day, dayFormat, { locale: fi })}</Typography>
            </Box>
          </Button>
        </Box>
      </Badge>
    )
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // overflow left side
        alignItems: 'center',
      }}>
      <IconButton onClick={() => handleWeekChange('prev')}>
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
      </IconButton>
      {days}
      <IconButton onClick={() => handleWeekChange('next')}>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </IconButton>
    </Box>
  )
}

export default CalendarDays
