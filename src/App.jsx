import './App.css'
import { useState } from 'react'
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
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('')

  // const [isComplete, setIsComplete] = useState(false)

  // const sortedTodos = todos.map()
  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() !== '') {
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
    clearInputs()
  }

  function clearInputs() {
    setInputValue('')
  }

  function handleCheckbox(id) {
    setTodos(
      todos.map(todo => {
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
  function handleMouseLeave(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            hoverered: !todo.hoverered,
          }
        } else {
          return todo
        }
      })
    )
  }
  // AA6AAA
  // EAE4EA

  function handleDelete(id) {
    const todo = todos.find(todo => todo.id === id)

    if (window.confirm(`Haluatko todella poistaa ${todo.task} tehtävän?`)) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  function handlePriorityChange(e) {
    setPriority(e.target.value)
  }

  return (
    <div style={{}}>
      <h1>THE TODO OO</h1>
      <form
        onSubmit={e => handleSubmit(e)}
        style={{ display: 'flex', flexDirection: 'row', marginBottom: '40px' }}>
        <TextField
          label='Lisää tehtävä'
          fullWidth
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id='priority-label'>Prioriteetti</InputLabel>
          <Select
            labelId='priority-label'
            id='priority-select'
            value={priority}
            onChange={handlePriorityChange}
            autoWidth
            label='Prioriteetti'>
            <MenuItem value='Matala'>Matala</MenuItem>
            <MenuItem value='Normaali'>Normaali</MenuItem>
            <MenuItem value='Korkea'>Korkea</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          style={{ borderRadius: '0 20px 20px 0' }}
          type='submit'>
          Lisää
        </Button>
      </form>
      <div style={{}}>
        {todos.map(todo => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '20px',
              borderStyle: 'dotted',
              borderRadius: '10px',
              padding: '0px',
              justifyContent: 'space-between',
              backgroundColor: '#ffff',
            }}
            key={todo.id}>
            <Checkbox
              checked={todo.complete}
              onChange={e => handleCheckbox(todo.id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <InputLabel
              key={todo.id}
              style={
                todo.complete
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
              }>
              {todo.task}
            </InputLabel>
            {todo.hoverered ? (
              <Button
                style={{ height: '100%' }}
                variant='contained'
                onClick={() => handleDelete(todo.id)}
                onMouseLeave={() => handleMouseLeave(todo.id)}>
                Delete
              </Button>
            ) : (
              <FaRegTrashAlt
                size={21}
                onMouseEnter={() => handleMouseLeave(todo.id)}
                style={{ paddingRight: '20px' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
