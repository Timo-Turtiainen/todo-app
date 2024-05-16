import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import TodoForm from './TodoForm'
import TaskCounter from './TaskCounter'
import TodoList from './TodoList'

/**
 * TodoPage component is the main page for displaying and managing the todo list.
 *
 * @returns {JSX.Element} The rendered TodoPage component.
 */
const TodoPage = () => {
  const [buttonLabel, setButtonLabel] = useState('Lisää')
  const message = 'Sinulla ei ole tehtäviä'

  const todos = useSelector((state) => state.todo.todos)

  return (
    <>
      <TodoForm buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
      <TaskCounter todos={todos} />
      {todos.length > 0 ? (
        <TodoList setButtonLabel={setButtonLabel} />
      ) : (
        <Typography mx={15}>{message}</Typography>
      )}
    </>
  )
}

export default TodoPage
