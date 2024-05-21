import { useState } from 'react'
import { Checkbox, Box, colors } from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { format, formatDistance } from 'date-fns'
import { fi } from 'date-fns/locale'
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

import { setSelectedTask } from '../reducers/todoSlice'
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

  const [expanded, setExpanded] = useState(false)

  const { t } = useTranslation()

  const formatDate = `dd MMM yyyy 'klo:'kk mm':' ss`
  // Format start and end times
  let startTime = format(todo.startTime, formatDate, { locale: fi })
  let endTime = todo.endTime
    ? format(todo.endTime, formatDate, { locale: fi })
    : null

  // Calculate duration if end time is available
  let duration = null
  if (endTime) {
    duration = formatDistance(todo.startTime, todo.endTime, {
      includeSeconds: true,
      numeric: 'always',
      locale: fi,
    })
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
      sx={{
        my: 1,
        border: 1,
        borderColor: activeBorderColor,
        maxWidth: 1080,
      }}>
      <CardHeader
        onClick={() => handleMultipleClicks(todo)}
        action={
          <Checkbox
            checked={todo.complete}
            onChange={() => handleCheckbox(todo)}
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
        subheader={`${t('priority')}: ${todo.priority}`}
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
          aria-label='add to favorites'
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
