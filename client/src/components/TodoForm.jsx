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
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import todoService from '../service/todoService'
import {
  createNewTodo,
  setTodos,
  setDescription,
  setTaskInput,
  setSelectedTask,
  setPriority,
} from '../reducers/todoSlice'
import { darkTheme } from './Theme'

/**
 * CustomTextField is a styled component that customizes the appearance of a TextField.
 *
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
      borderColor: theme.palette.primary.dark, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary, // Label color
    '&.Mui-focused': { color: theme.palette.text.primary },
  },
}))

/**
 * TodoForm component renders a form for adding or updating todo items.
 *
 * @param {string} props.buttonLabel - The label text for the submit button.
 * @param {Function} props.setButtonLabel - Function to update the button label text.
 * @returns {JSX.Element} The rendered TodoForm component.
 */
function TodoForm({ buttonLabel, setButtonLabel }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const todos = useSelector((state) => state.todo.todos)
  const taskInput = useSelector((state) => state.todo.taskInput)
  const description = useSelector((state) => state.todo.description)
  const selectedTask = useSelector((state) => state.todo.selectedTask)
  const priority = useSelector((state) => state.todo.priority)
  const timestamp = useSelector((state) => state.todo.selectedDay)
  const selectedDay = new Date(timestamp)
  const { t } = useTranslation()

  /**
   * Handles form submission for adding or updating a todo item.
   *
   * @param {Event} e - The form submit event.
   */
  async function handleSubmit(e) {
    e.preventDefault()

    if (taskInput.trim() !== '') {
      // Update selected todo
      if (selectedTask) {
        const updateTodoObject = {
          ...selectedTask,
          task: taskInput,
          description: description,
          priority: priority,
          endTime: Date.now(),
          user: selectedTask.user.id,
        }

        try {
          const updatedTodo = await todoService.updateTodo(
            updateTodoObject,
            user.token
          )
          dispatch(
            setTodos(
              todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                  return updatedTodo
                } else {
                  return todo
                }
              })
            )
          )
        } catch (error) {
          console.error('Error updating todo:', error.message)
        }
      } else {
        // Create new todo
        const newTodo = {
          id: uuidv4(),
          task: taskInput,
          description: description,
          priority: priority,
          startTime: selectedDay,
          complete: false,
          hoverered: false, // not needed atm (remove in the future)
          user: user.id,
        }
        try {
          dispatch(createNewTodo(newTodo, user.token))
        } catch (error) {
          console.error('Error creating todo:', error)
        }
      }
    }
    // Reset form inputs and state after form submit
    setButtonLabel(t('addButton'))
    clearInputs()
  }

  /**
   * Clears the input fields and resets selected todo state.
   */
  function clearInputs() {
    dispatch(setTaskInput(''))
    dispatch(setDescription(''))
    dispatch(setPriority(t('')))
    dispatch(setSelectedTask(null))
  }

  /**
   * Handles priority change in the Select component.
   *
   * @param {Event} e - The change event of the Select component.
   */
  function handlePriorityChange(e) {
    console.log(e.target.value)
    dispatch(setPriority(e.target.value))
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box sx={{ display: 'flex', px: 5, pt: 5, py: 5 }}>
        <CustomTextField
          label={t('addTask')}
          fullWidth
          value={taskInput}
          onChange={({ target }) => dispatch(setTaskInput(target.value))}
          variant='outlined'
          multiline
          maxRows={4}
        />
        <CustomTextField
          label={t('addDescription')}
          fullWidth
          value={description}
          onChange={({ target }) => dispatch(setDescription(target.value))}
          variant='outlined'
          multiline
          maxRows={4}
        />

        <FormControl
          sx={{ minWidth: 120, color: darkTheme.palette.text.primary }}
        >
          <InputLabel
            id='priority-label'
            sx={{
              color: darkTheme.palette.text.primary, // Change label color when focused
              '&.Mui-focused': {
                color: darkTheme.palette.text.primary, // Label color when focused
              },
            }}
          >
            {t('priority')}
          </InputLabel>
          <Select
            labelId='priority-label'
            id='priority-select'
            value={priority}
            label={t('priority')}
            onChange={handlePriorityChange}
            sx={{
              color: '#fff', // Text color
              '&:hover': {
                '& fieldset': {
                  borderColor: `${darkTheme.palette.primary.dark} !important`, // Border color on hover
                },
              },
              '& fieldset': {
                borderColor: '#ccc', // Default border color
              },
              '&.Mui-focused fieldset': {
                borderColor: `${darkTheme.palette.primary.dark} !important`, // Border color when focused
              },
            }}
          >
            <MenuItem value='low'>{t('priorityLow')}</MenuItem>
            <MenuItem value='normal'>{t('priorityNormal')}</MenuItem>
            <MenuItem value='high'>{t('priorityHigh')}</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ borderRadius: '0 20px 20px 0' }}
          type='submit'
          sx={{
            backgroundColor: darkTheme.palette.primary.light,
            '&:hover': {
              backgroundColor: darkTheme.palette.primary.dark,
              color: darkTheme.palette.text.secondary,
            },
            maxHeight: '56px',
          }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </form>
  )
}

export default TodoForm
