import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Calendar from './Calendar'

/**
 * TodoPage component is the main page for displaying and managing the todo list.
 *
 * @returns {JSX.Element} The rendered TodoPage component.
 */
function TodoPage() {
  const [buttonLabel, setButtonLabel] = useState('Lisää')
  const message = 'Sinulla ei ole tehtäviä'

  const todos = useSelector((state) => state.todo.todos)

  return (
    <>
      <TodoForm buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
      <Calendar />
      {todos.length > 0 ? (
        <TodoList setButtonLabel={setButtonLabel} />
      ) : (
        <Typography mx={15}>{message}</Typography>
      )}
    </>
  )
}

export default TodoPage
