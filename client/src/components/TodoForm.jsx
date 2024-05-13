import { v4 as uuidv4 } from 'uuid'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  styled,
} from '@mui/material'
import todoService from '../service/todoService'

/**
 * CustomTextField is a styled component that customizes the appearance of a TextField.
 * @param {object} props - The component props.
 * @param {object} props.theme - The MUI theme object.
 * @returns {JSX.Element} A styled TextField component.
 */
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[500], // Default border color
    },
    '&:hover fieldset': {
      borderColor: theme.palette.activeBorder, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.activeBorder, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: '#fff', // Label color
    '&.Mui-focused': { color: '#fff' },
  },
}))

/**
 * TodoForm component renders a form for adding or updating todo items.
 * @param {Object} props - The component props.
 * @param {string} props.taskInputValue - The value of the task input field.
 * @param {Function} props.setTaskInputValue - Function to update the task input value.
 * @param {string} props.descriptionInputValue - The value of the description input field.
 * @param {Function} props.setDescriptionInputValue - Function to update the description input value.
 * @param {Array<Object>} props.todos - An array of todo objects.
 * @param {Function} props.setTodos - Function to update the todo array.
 * @param {Object} props.selectedTodo - The selected todo item for editing (optional).
 * @param {Function} props.setSelectedTodo - Function to set the selected todo item.
 * @param {string} props.initialPriority - The initial priority value.
 * @param {string} props.priority - The priority value selected in the form.
 * @param {Function} props.setPriority - Function to update the priority value.
 * @param {string} props.buttonLabel - The label text for the submit button.
 * @param {Function} props.setButtonLabel - Function to update the button label text.
 * @returns {JSX.Element} The rendered TodoForm component.
 */
function TodoForm({
  taskInputValue,
  setTaskInputValue,
  descriptionInputValue,
  setDescriptionInputValue,
  todos,
  setTodos,
  selectedTodo,
  setSelectedTodo,
  initialPriority,
  priority,
  setPriority,
  buttonLabel,
  setButtonLabel,
  user,
}) {
  async function handleSubmit(e) {
    e.preventDefault()

    if (taskInputValue.trim() !== '') {
      // Update existing todo
      if (selectedTodo) {
        const updateTodoObject = {
          ...selectedTodo,
          task: taskInputValue,
          description: descriptionInputValue,
          priority: priority,
          endTime: Date.now(),
          user: selectedTodo.user.id,
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
        // Create new todo
        const newTodo = {
          id: uuidv4(),
          task: taskInputValue,
          description: descriptionInputValue,
          priority: priority,
          startTime: Date.now(),
          complete: false,
          hoverered: false, // not needed atm (remove in the future)
        }
        try {
          const createdTodo = await todoService.createTodo(newTodo, user.token)
          setTodos([...todos, createdTodo])
        } catch (error) {
          console.error('Error creating todo:', error)
        }
      }
    }
    // Reset form inputs and state after form submit
    setButtonLabel('Lisää')
    setPriority(initialPriority)
    clearInputs()
  }

  /**
   * Clears the input fields and resets selected todo state.
   */
  function clearInputs() {
    setTaskInputValue('')
    setDescriptionInputValue('')
    setPriority(initialPriority)
    setSelectedTodo(null)
  }

  /**
   * Handles priority change in the Select component.
   * @param {Event} e - The change event of the Select component.
   */
  function handlePriorityChange(e) {
    setPriority(e.target.value)
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <Box display={'flex'} my={4} px={5} maxWidth={1080}>
        <CustomTextField
          label='Lisää tehtävä'
          fullWidth
          value={taskInputValue}
          onChange={({ target }) => setTaskInputValue(target.value)}
          variant='outlined'
          multiline
          maxRows={4}
        />
        <CustomTextField
          label='Lisää kuvaus'
          fullWidth
          value={descriptionInputValue}
          onChange={({ target }) => setDescriptionInputValue(target.value)}
          variant='outlined'
          multiline
          maxRows={4}
        />

        <FormControl sx={{ minWidth: 120, color: '#fff' }}>
          <InputLabel
            id='priority-label'
            sx={{
              color: '#ffffff', // Change label color when focused
              '&.Mui-focused': {
                color: '#ffffff', // Label color when focused
              },
            }}>
            Prioriteetti
          </InputLabel>
          <Select
            labelId='priority-label'
            id='priority-select'
            value={priority}
            label='Prioriteetti'
            onChange={handlePriorityChange}
            sx={{
              color: '#fff', // Text color
              '&:hover': {
                '& fieldset': {
                  borderColor: '#58ff4f !important', // Border color on hover
                },
              },
              '& fieldset': {
                borderColor: '#ccc', // Default border color
              },
              '&.Mui-focused fieldset': {
                borderColor: '#58ff4f !important', // Border color when focused
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
