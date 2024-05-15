import { useState } from 'react'
import { Checkbox, Box } from '@mui/material'
import { FaRegTrashAlt } from 'react-icons/fa'
import { format, formatDistance } from 'date-fns'
import { fi } from 'date-fns/locale'
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

// Styled component for expand/collapse button
const ExpandMore = styled((props) => {
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
 * @param {Object} props.selectedTodo - The currently selected todo item.
 * @param {Function} props.setSelectedTodo - Function to set the selected todo item.
 * @param {Function} props.handleEditTask - Function to handle editing a todo item.
 * @param {Function} props.handleDelete - Function to handle deleting a todo item.
 * @param {Function} props.handleCheckbox - Function to handle checkbox state change.
 * @returns {JSX.Element} The rendered TodoItem component.
 */
function TodoItem({
  todo,
  selectedTodo,
  setSelectedTodo,
  handleEditTask,
  handleDelete,
  handleCheckbox,
}) {
  const [expanded, setExpanded] = useState(false)

  const formatDate = 'dd MMM yyyy'
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
  if (selectedTodo) {
    activeBorderColor =
      selectedTodo.id === todo.id && !todo.complete ? '#58ff4f' : 'gray'
  }
  // Toggle expand/collapse state
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  // Handle clicks for editing and selecting a todosssssss
  function handleMultipleClicks(todo) {
    handleEditTask(todo, todo.complete)
    setSelectedTodo(todo)
  }

  return (
    <Card
      sx={{
        my: 1,
        border: 1,
        borderColor: activeBorderColor,
        maxWidth: 1080,
      }}
    >
      <CardHeader
        onClick={() => handleMultipleClicks(todo)}
        action={
          <Checkbox
            checked={todo.complete}
            onChange={() => handleCheckbox(todo.id, todo.complete)}
            inputProps={{
              'aria-label': 'controlled',
            }}
            sx={{
              color: '#fff',
              '&.Mui-checked': {
                color: '#0bbd02',
              },
            }}
          />
        }
        title={todo.task}
        subheader={`Prioriteetti: ${todo.priority}`}
      />
      <CardActions>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpandClick()}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <IconButton
          aria-label='add to favorites'
          style={{ marginLeft: 'auto' }}
          sx={{
            '&:hover': {
              backgroundColor: '#58ff4f',
              color: '#000',
            },
          }}
          onClick={() => handleDelete(todo.id)}
        >
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
