import { v4 as uuidv4 } from 'uuid'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material'
import todoService from '../service/todoService'

function TodoForm({
  taskInputValue,
  setTaskInputValue,
  descriptionInputValue,
  setDescriptionInputValue,
  todos,
  setTodos,
  existingTodo,
  setExistingTodo,
  initialPriority,
  priority,
  setPriority,
  buttonLabel,
  setButtonLabel,
}) {
  async function handleSubmit(e) {
    e.preventDefault()

    if (taskInputValue.trim() !== '') {
      // if there is already todo
      if (existingTodo) {
        const updateTodoObject = {
          ...existingTodo,
          task: taskInputValue,
          description: descriptionInputValue,
          priority: priority,
        }
        try {
          const updatedTodo = await todoService.updateTodo(updateTodoObject)
          setTodos(
            todos.map(todo => {
              if (todo.id === updatedTodo.id) {
                return updatedTodo
              } else {
                return todo
              }
            })
          )
        } catch (error) {
          console.error('Error updating todo:', error.message)
        }
      } else {
        const newTodo = {
          id: uuidv4(),
          task: taskInputValue,
          description: descriptionInputValue,
          priority: priority,
          startTime: Date.now(),
          complete: false,
          hoverered: false,
        }
        try {
          console.log(newTodo)
          const createdTodo = await todoService.createTodo(newTodo)
          console.log(createdTodo)
          setTodos([...todos, createdTodo])
        } catch (error) {
          console.error('Error creating todo:', error)
        }
      }
    }

    setButtonLabel('Lisää')
    setPriority(initialPriority)
    clearInputs()
  }

  function clearInputs() {
    setTaskInputValue('')
    setDescriptionInputValue('')
    setPriority(initialPriority)
    setExistingTodo(null)
  }
  function handlePriorityChange(e) {
    setPriority(e.target.value)
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Box display={'flex'} my={4} px={5}>
        <TextField
          label='Lisää tehtävä'
          fullWidth
          value={taskInputValue}
          onChange={({ target }) => setTaskInputValue(target.value)}
          variant='outlined'
          multiline
          maxRows={4}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            sx: {
              '&:hover fieldset': {
                borderColor: '#58ff4f !important',
              },
            },
          }}
        />
        <TextField
          label='Lisää kuvaus'
          fullWidth
          value={descriptionInputValue}
          onChange={({ target }) => setDescriptionInputValue(target.value)}
          variant='outlined'
          multiline
          maxRows={4}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            sx: {
              '&:hover  fieldset': {
                borderColor: '#58ff4f !important',
              },
            },
          }}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id='priority-label'>Prioriteetti</InputLabel>
          <Select
            labelId='priority-label'
            id='priority-select'
            value={priority}
            onChange={handlePriorityChange}
            autoWidth
            label='Prioriteetti'
            sx={{
              color: '#fff',
              '&:hover fieldset': {
                borderColor: '#58ff4f !important',
              },
            }}>
            <MenuItem value='Matala'>Matala</MenuItem>
            <MenuItem value='Normaali'>Normaali</MenuItem>
            <MenuItem value='Korkea'>Korkea</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ borderRadius: '0 20px 20px 0' }}
          type='submit'
          sx={{
            backgroundColor: '#0bbd02',
            '&:hover': { backgroundColor: '#58ff4f' },
            maxHeight: '56px',
          }}>
          {buttonLabel}
        </Button>
      </Box>
    </form>
  )
}

export default TodoForm
