import React, { useState } from 'react'
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

function Calendar() {
  const dispatch = useDispatch()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth))

  const timestamp = useSelector(state => state.todo.selectedDay)
  const selectedDay = new Date(timestamp)
  const todos = useSelector(state => state.todo.todos)

  function renderHeader() {
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

  function renderDays() {
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
          // color={darkTheme.palette.primaryGreen}
          sx={{
            marginRight: '20px',
            '& .MuiBadge-badge': {
              backgroundColor: initialDay
                ? darkTheme.palette.primaryGreen
                : darkTheme.palette.activeGreen,
              color: '#000',
            },
          }}>
          <Box>
            <Button
              variant='contained'
              sx={{
                height: '54px',

                backgroundColor: initialDay
                  ? darkTheme.palette.activeGreen
                  : darkTheme.palette.background.primary,
                color: initialDay ? '#000000' : '#ffffff',

                '&:hover': { backgroundColor: '#58ff4f', color: '#000' },
                '&:focus': { backgroundColor: '#58ff4f', color: '#000' },
              }}
              onClick={() => handleDayPress(day)}>
              <Box display={'flex'} flexDirection={'column'}>
                <Typography>
                  {format(day, dateFormat, { locale: fi })}
                </Typography>
                <Typography>
                  {format(day, dayFormat, { locale: fi })}
                </Typography>
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

  return (
    <Box>
      {renderHeader()} {renderDays()}
    </Box>
  )
}

export default Calendar
