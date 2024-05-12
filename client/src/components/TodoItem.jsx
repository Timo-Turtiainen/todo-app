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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  // marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

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

  let startTime = format(todo.startTime, formatDate, { locale: fi })
  let endTime = todo.endTime
    ? format(todo.endTime, formatDate, { locale: fi })
    : null

  let duration = null

  if (endTime) {
    duration = formatDistance(todo.startTime, todo.endTime, {
      includeSeconds: true,
      numeric: 'always',
      locale: fi,
    })
  }

  let activeBorderColor = 'gray'
  if (selectedTodo) {
    activeBorderColor =
      selectedTodo.id === todo.id && !todo.complete ? '#58ff4f' : 'gray'
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

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

    // OLD VERSION
    // <Box
    //   display={'flex'}
    //   m={1}
    //   justifyContent={'space-between'}
    //   alignItems={'center'}
    //   sx={{
    //     bgcolor:
    //       todo.priority === 'Korkea'
    //         ? '#6e6e6e' // Priority is 'Korkea' (High) -> Green color
    //         : todo.priority === 'Normaali'
    //         ? '#4a4a4a' // Priority is 'Normaali' (Normal) -> Dark
    //         : '#303030', // Priority is Matala (Low) -> Darker
    //     borderRadius: '15px',
    //   }}
    //   onClick={() => handleMultipleClicks(todo)}
    // >
    //   {/* Left side content */}
    //   <Box
    //     display={'flex'}
    //     alignItems={'center'}
    //     justifyContent={'flex-start'}
    //     flexWrap={'wrap'}
    //   >
    //     <Checkbox
    //       checked={todo.complete}
    //       onChange={() => handleCheckbox(todo.id, todo.complete)}
    //       inputProps={{
    //         'aria-label': 'controlled',
    //       }}
    //       sx={{
    //         '& .MuiSvgIcon-root': {
    //           fill: todo.complete ? '#fff' : '#ffffff', // Change the fill color based on checkbox state
    //         },
    //         '& .MuiCheckbox-root': {
    //           color: '#1976d2', // Custom color for the checkbox itself
    //         },
    //         '& .Mui-checked': {
    //           color: '#1976d2', // Color when checkbox is checked
    //         },
    //       }}
    //     />
    //     <InputLabel>{todo.task}</InputLabel>
    //     <InputLabel>{todo.description}</InputLabel>
    //     {/* Display Begin and End Time on top of each other  */}
    //     <div>
    //       <InputLabel>
    //         {todo.startTime
    //           ? format(todo.startTime, formatDate, { locale: fi })
    //           : null}
    //       </InputLabel>
    //       <InputLabel>
    //         {todo.complete
    //           ? format(todo.endTime, formatDate, { locale: fi })
    //           : null}
    //       </InputLabel>
    //     </div>
    //     <InputLabel>
    //       {todo.complete
    //         ? formatDistance(todo.startTime, todo.endTime, {
    //             includeSeconds: true,
    //             numeric: 'always',
    //             locale: fi,
    //           })
    //         : null}
    //     </InputLabel>
    //   </Box>
    //   {/* Right side content */}
    //   <Box display={'flex'} alignItems={'center'}>
    //     <InputLabel style={{ marginRight: '15px' }}>{todo.priority}</InputLabel>
    //     <Button
    //       startIcon={
    //         <FaRegTrashAlt
    //           style={{
    //             position: 'absolute',
    //             top: '50%',
    //             left: '50%',
    //             transform: 'translate(-50%, -50%)',
    //             fontSize: '24px',
    //           }}
    //         />
    //       }
    //       variant='contained'
    //       onClick={() => handleDelete(todo.id)}
    //       sx={{
    //         // button color
    //         backgroundColor:
    //           todo.priority === 'Korkea'
    //             ? '#6e6e6e'
    //             : todo.priority === 'Normaali'
    //             ? '#4a4a4a'
    //             : '#303030',
    //         color: 'white', // icon color

    //         '&:hover': { backgroundColor: '#58ff4f', color: '#000' },
    //         borderRadius: '0 15px 15px 0',
    //         width: '56px',
    //         height: '56px',
    //         position: 'relative',
    //       }}
    //     ></Button>
    //   </Box>
    // </Box>
  )
}

export default TodoItem
