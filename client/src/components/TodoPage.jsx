import React, { useState } from 'react'
import { Typography } from '@mui/material'
import TodoForm from './TodoForm'
import TaskCounter from './TaskCounter'
import TodoList from './TodoList'

import { useSelector } from 'react-redux'
/**
 * TodoPage component is the main page for displaying and managing the todo list.
 *
 * @param {Array<Object>} props.todos - The array of todo items.
 * @param {Function} props.setTodos - Function to update the todos array.
 * @param {Object} props.user - The current user object.
 * @param {Function} props.setUser - Function to update the user object.
 * @returns {JSX.Element} The rendered TodoPage component.
 */
const TodoPage = () => {
  const initialPriority = 'Normaali'
  const [selectedTodo, setSelectedTodo] = useState('')
  const [taskInputValue, setTaskInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)
  const [buttonLabel, setButtonLabel] = useState('Lisää')
  const message = 'Sinulla ei ole tehtäviä'

  const todos = useSelector((state) => state.todo)

  return (
    <>
      <TodoForm
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        initialPriority={initialPriority}
        priority={priority}
        setPriority={setPriority}
        buttonLabel={buttonLabel}
        setButtonLabel={setButtonLabel}
      />
      <TaskCounter todos={todos} />
      {todos.length > 0 ? (
        <TodoList
          taskInputValue={taskInputValue}
          setTaskInputValue={setTaskInputValue}
          descriptionInputValue={descriptionInputValue}
          setDescriptionInputValue={setDescriptionInputValue}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
          priority={priority}
          setPriority={setPriority}
          initialPriority={initialPriority}
          setButtonLabel={setButtonLabel}
        />
      ) : (
        <Typography mx={15}>{message}</Typography>
      )}
    </>
  )
}

export default TodoPage
