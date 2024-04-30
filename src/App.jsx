import './App.css'
import { useState } from 'react'
import {
  Button,
  TextField,
  InputLabel,
  Checkbox,
  MenuItem,
  Select,
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  // const [isComplete, setIsComplete] = useState(false)

  // const sortedTodos = todos.map()
  function handleSubmit(e) {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          title: inputValue,
          complete: false,
          priority: 'normal',
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

  return (
    <>
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
        <Button
          variant='contained'
          style={{ borderRadius: '0 20px 20px 0' }}
          type='submit'>
          Lisää
        </Button>
      </form>
      <Select label='Prioriteetti'>
        <MenuItem value='low'>Low</MenuItem>
        <MenuItem value='normal'>Normal</MenuItem>
        <MenuItem value='high'>High</MenuItem>
      </Select>

      {todos.map(todo => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '20px',
            borderStyle: 'dotted',
            borderRadius: '10px',
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
            {todo.title}
          </InputLabel>
        </div>
      ))}
    </>
  )
}

export default App
