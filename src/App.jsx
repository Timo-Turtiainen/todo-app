import './App.css'
import { useState, useRef } from 'react'
import { Button, TextField, InputLabel } from '@mui/material'
function App() {
  const todoRef = useRef('')
  const [items, setItems] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    const todo = todoRef.current
    setItems()
    console.log(todo)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Lisää tehtävä'
          fullWidth
          ref={todoRef}
          onChange={({ target }) => target.value}
        />
      </form>
      <Button>Lisää</Button>
      {items.map((todo, index) => (
        <InputLabel key={index}>{todo}</InputLabel>
      ))}
    </>
  )
}

export default App
