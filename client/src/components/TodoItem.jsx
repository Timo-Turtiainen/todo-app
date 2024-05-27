import { useState, useEffect } from 'react'
import { Checkbox, Box } from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  formatDistance,
  subYears,
  subMonths,
  subDays,
  subHours,
  subMinutes,
} from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  styled,
  Typography,
  IconButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { handleLocaleSwitch, setSelectedTask } from '../reducers/todoSlice'
import { darkTheme } from './Theme'

// Styled component for expand/collapse button
const ExpandMore = styled(props => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

/**
 * TodoItem component represents an individual todo item.
 *
 * @param {Object} props.todo - The todo item object.
 * @param {Function} props.handleEditTask - Function to handle editing a todo item.
 * @param {Function} props.handleDelete - Function to handle deleting a todo item.
 * @param {Function} props.handleCheckbox - Function to handle checkbox state change.
 * @returns {JSX.Element} The rendered TodoItem component.
 */
function TodoItem({ todo, handleEditTask, handleDelete, handleCheckbox }) {
  const dispatch = useDispatch()
  const selectedTask = useSelector(state => state.todo.selectedTask)
  const selectedLanguage = useSelector(state => state.todo.selectedLanguage)
  const [expanded, setExpanded] = useState(false)
  const [isComplete, setIsComplete] = useState(todo.complete)
  const [animate, setAnimate] = useState(false)
  const { t } = useTranslation()

  const formatDate = `dd MMM yyyy '${t('clock')}:'kk mm':' ss`
  // Format start and end times
  let startTime = format(todo.startTime, formatDate, {
    locale: handleLocaleSwitch(selectedLanguage),
  })
  let endTime = todo.endTime
    ? format(todo.endTime, formatDate, {
        locale: handleLocaleSwitch(selectedLanguage),
      })
    : null

  // Calculate duration if end time is available
  let duration = null
  if (endTime) {
    duration = formatDistance(todo.startTime, todo.endTime, {
      includeSeconds: true,
      numeric: 'always',
      locale: handleLocaleSwitch(selectedLanguage),
    })

    // Alternative way of representing time
    // let years = differenceInYears(
    //   new Date(todo.endTime),
    //   new Date(todo.startTime)
    // )
    // let remainingDate = subYears(todo.endTime, years)

    // let months = differenceInMonths(remainingDate, todo.startTime)
    // remainingDate = subMonths(remainingDate, months)

    // let days = differenceInDays(remainingDate, todo.startTime)
    // remainingDate = subDays(remainingDate, days)

    // let hours = differenceInHours(remainingDate, todo.startTime)
    // remainingDate = subHours(remainingDate, hours)

    // let minutes = differenceInMinutes(remainingDate, todo.startTime)
    // remainingDate = subMinutes(remainingDate, minutes)

    // let seconds = differenceInSeconds(remainingDate, todo.startTime)
    // console.log(
    //   `Duration: ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
    // )
  }

  // Determine the border color based on selection and completion status
  let activeBorderColor = 'gray'
  if (selectedTask) {
    activeBorderColor =
      selectedTask.id === todo.id && !todo.complete
        ? darkTheme.palette.primary.dark
        : 'gray'
  }
  // Toggle expand/collapse state
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleCheckboxClick = todo => {
    setAnimate(true)
    handleCheckbox(todo)
    setIsComplete(prev => !prev)
  }

  useEffect(() => {
    setIsComplete(todo.complete)
    setAnimate(true)
  }, [todo.complete])

  // Handle clicks for editing and selecting a todosssssss
  function handleMultipleClicks(todo) {
    handleEditTask(todo)
    // you cannot choose completed task to be selectedTask(active task)
    if (!todo.complete) {
      dispatch(setSelectedTask(todo))
    }
  }

  return (
    <Card
      className={animate ? 'animate' : ''}
      sx={{
        my: 1,
        border: 1,
        borderColor: activeBorderColor,
        width: '50%',
        transform: isComplete ? 'translateY(150px)' : 'translateY(0)',
        animation: isComplete
          ? 'moveDown 0.5s ease-in-out alternate'
          : 'moveUp 0.5s ease-in-out alternate',
      }}
      onTransitionEnd={() => setAnimate(false)}
      onAnimationEnd={() => setAnimate(false)}>
      <CardHeader
        onClick={() => handleMultipleClicks(todo)}
        action={
          <Checkbox
            checked={todo.complete}
            onChange={() => handleCheckboxClick(todo)}
            inputProps={{
              'aria-label': 'controlled',
            }}
            sx={{
              color: darkTheme.palette.primary.contrastText,
              '&.Mui-checked': {
                color: darkTheme.palette.primary.light,
              },
            }}
          />
        }
        sx={{ color: darkTheme.palette.text.primary }}
        title={todo.task}
        // subheader={`${t('priority')}: ${t(`${todo.priority}`)}`}
        // subheader={`${t('priority')}: ${t(`priorityValue.${todo.priority}`)}`}
        subheader={`${t('priority')}: ${t(
          `priority${
            todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)
          }`
        )}`}
        subheaderTypographyProps={{
          sx: { color: darkTheme.palette.text.primary },
        }}
      />
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick()}
          aria-expanded={expanded}
          aria-label='show more'>
          <ExpandMoreIcon />
        </ExpandMore>
        <IconButton
          style={{ marginLeft: 'auto' }}
          sx={{
            '&:hover': {
              backgroundColor: darkTheme.palette.primary.dark,
              color: darkTheme.palette.text.secondary,
            },
          }}
          onClick={() => handleDelete(todo.id)}>
          <FaRegTrashAlt size={20} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{todo.description}</Typography>
          {todo.complete ? (
            <Box flexDirection={'column'}>
              <Typography paragraph>{`${startTime} - ${endTime}`}</Typography>
              <Typography paragraph>{duration}</Typography>
            </Box>
          ) : (
            <Typography paragraph>{startTime} </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default TodoItem
