import './App.css'
import { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  InputLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'

import { v4 as uuidv4 } from 'uuid'
import { FaRegTrashAlt } from 'react-icons/fa'

function App() {
  const initialPriority = 'Normaali'
  const [todos, setTodos] = useState([])
  const [existingTodo, setExistingTodo] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)

  useEffect(() => {
    // Simulating async data loading (replace with actual data fetching)
    const fetchData = async () => {
      // Fetch todos data (e.g., from an API)
      const fetchedTodos = await fetchTodosFromAPI()
      setTodos(fetchedTodos) // Set todos state after fetching data
    }

    fetchData() // Fetch data when component mounts
  }, [])

  useEffect(() => {
    sortTodosByCompleteAndPriority()
  }, [todos]) // Sort todos whenever todos state changes

  // Function to fetch todos data (simulated async operation)
  const fetchTodosFromAPI = async () => {
    // Simulated API response (replace with actual API call)
    return [
      {
        id: uuidv4(),
        task: 'Task 1',
        priority: 'Normaali',
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 2',
        priority: 'Korkea',
        complete: false,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 3',
        priority: 'Matala',
        complete: true,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 4',
        priority: 'Normaali',
        complete: true,
        hoverered: false,
      },
      {
        id: uuidv4(),
        task: 'Task 5',
        priority: 'Korkea',
        complete: false,
        hoverered: false,
      },
    ]
  }

  // Function to sort todos by completion status and priority
  const sortTodosByCompleteAndPriority = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      // Compare completion status first
      if (a.complete && !b.complete) {
        return 1 // a (completed) should come after b (not completed)
      }
      if (!a.complete && b.complete) {
        return -1 // a (not completed) should come before b (completed)
      }

      // If both have the same completion status, compare by priority
      const priorityOrder = { Korkea: 1, Normaali: 2, Matala: 3 }
      const priorityA = priorityOrder[a.priority]
      const priorityB = priorityOrder[b.priority]

      return priorityA - priorityB // Compare priorities based on order
    })

    setTodos(sortedTodos)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (inputValue.trim() !== '') {
      if (existingTodo) {
        setTodos(
          todos.map((todo) =>
            todo.id === existingTodo.id
              ? { ...todo, task: inputValue, priority: priority }
              : todo
          )
        )
      } else {
        setTodos([
          ...todos,
          {
            id: uuidv4(),
            task: inputValue,
            complete: false,
            priority: priority,
            hoverered: false,
          },
        ])
      }
    }

    setPriority(initialPriority)
    clearInputs()
  }

  function clearInputs() {
    setInputValue('')
    setPriority(initialPriority)
    setExistingTodo(null)
  }

  function handleCheckbox(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            complete: !todo.complete,
          }
        } else {
          return todo
        }
      })
    )
  }

  function handleMouseHover(id, isHovered) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, hoverered: isHovered } : todo
      )
    )
  }

  function handleDelete(id) {
    const todo = todos.find((todo) => todo.id === id)

    if (window.confirm(`Haluatko todella poistaa ${todo.task} tehtävän?`)) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  function handlePriorityChange(e) {
    setPriority(e.target.value)
  }

  function editTask(todo) {
    setExistingTodo(todo)
    setInputValue(todo.task)
    setPriority(todo.priority)
  }

  return (
    <div className='background'>
      <h1 style={{ color: '#ffffff' }}>THE TODO OO</h1>
      <div className='container'>
        <h2 style={{ color: '#2980b9' }}>Tehtäviä</h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '40px',
          }}
        >
          <TextField
            label='Lisää tehtävä'
            fullWidth
            value={inputValue}
            onChange={({ target }) => setInputValue(target.value)}
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
                  },
                },
              }}
            >
              <MenuItem value='Matala'>Matala</MenuItem>
              <MenuItem value='Normaali'>Normaali</MenuItem>
              <MenuItem value='Korkea'>Korkea</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='contained'
            style={{ borderRadius: '0 20px 20px 0' }}
            type='submit'
          >
            {existingTodo ? 'Päivitä' : 'Lisää'}
          </Button>
        </form>
        <div>
          {todos.map((todo) => (
            <div
              className='todo-item'
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '20px',
                borderRadius: '10px',
                backgroundColor: '#1976d2',
              }}
              key={todo.id}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  checked={todo.complete}
                  onChange={() => handleCheckbox(todo.id)}
                  inputProps={{
                    'aria-label': 'controlled',
                  }}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fill: todo.complete ? '#ffffff' : '#ffffff', // Change the fill color based on checkbox state
                    },
                    '& .MuiCheckbox-root': {
                      color: '#1976d2', // Custom color for the checkbox itself
                    },
                    '& .Mui-checked': {
                      color: '#1976d2', // Color when checkbox is checked
                    },
                  }}
                />
                <div
                  onClick={() => editTask(todo)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: todo.complete ? 'line-through' : 'none',
                    alignItems: 'center',
                  }}
                >
                  <InputLabel
                    style={{
                      color: '#ffffff',
                      textDecoration: todo.complete ? 'line-through' : 'none',
                    }}
                    key={todo.id}
                  >
                    {todo.task}
                  </InputLabel>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <InputLabel style={{ marginRight: '20px', color: '#ffffff' }}>
                  {todo.priority}
                </InputLabel>
                {todo.hoverered ? (
                  <Button
                    style={{
                      height: '100%',
                      borderRadius: '0 10px 10px 0',
                      backgroundColor: '#ff3737',
                      display: todo.hoverered ? 'block' : 'none',
                      transition: 'background-color 0.3s ease-in-out',
                    }}
                    variant='contained'
                    onClick={() => handleDelete(todo.id)}
                    onMouseLeave={() => handleMouseHover(todo.id, false)}
                  >
                    Delete
                  </Button>
                ) : (
                  <FaRegTrashAlt
                    size={21}
                    onMouseEnter={() => handleMouseHover(todo.id, true)}
                    style={{ paddingRight: '20px', color: '#ffffff' }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
