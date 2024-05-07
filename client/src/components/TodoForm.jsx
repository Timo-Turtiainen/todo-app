import { v4 as uuidv4 } from 'uuid'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
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
  function handleSubmit(e) {
    e.preventDefault()

    if (taskInputValue.trim() !== '') {
      // if there is already todo
      if (existingTodo) {
        setTodos(
          todos.map(todo =>
            todo.id === existingTodo.id
              ? {
                  ...todo,
                  task: taskInputValue,
                  description: descriptionInputValue,
                  priority: priority,
                }
              : todo
          )
        )
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
          const createdTodo = todoService.createTodo(newTodo)
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
    <form
      onSubmit={e => handleSubmit(e)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '40px',
      }}>
      <TextField
        label='Lisää tehtävä'
        fullWidth
        value={taskInputValue}
        onChange={({ target }) => setTaskInputValue(target.value)}
        InputLabelProps={{
          style: { color: '#2980b9' },
        }}
        InputProps={{
          style: { backgroundColor: '#bafaff' },
          sx: {
            '&:hover': {
              '& fieldset': {
                borderColor: '#2980b9 !important',
              },
            },
          },
        }}
      />
      <TextField
        label='Lisää kuvaus'
        fullWidth
        value={descriptionInputValue}
        onChange={({ target }) => setDescriptionInputValue(target.value)}
        InputLabelProps={{
          style: { color: '#2980b9' },
        }}
        InputProps={{
          style: { backgroundColor: '#bafaff' },
          sx: {
            '&:hover': {
              '& fieldset': {
                borderColor: '#2980b9 !important',
              },
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
            '&:hover': {
              '& fieldset': {
                borderColor: '#2980b9 !important', // Change border color on hover
                // backgroundColor: '#bafaff',
              },
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
        type='submit'>
        {buttonLabel}
      </Button>
    </form>
  )
}

export default TodoForm
