import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import TodoForm from './TodoForm'
import TaskCounter from './TaskCounter'
import TodoList from './TodoList'

const TodoPage = ({ todos, setTodos, user }) => {
  const initialPriority = 'Normaali'
  const [selectedTodo, setSelectedTodo] = useState('')
  const [taskInputValue, setTaskInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [priority, setPriority] = useState(initialPriority)
  const [buttonLabel, setButtonLabel] = useState('Lisää')

  return (
    <>
      <TodoForm
        taskInputValue={taskInputValue}
        setTaskInputValue={setTaskInputValue}
        descriptionInputValue={descriptionInputValue}
        setDescriptionInputValue={setDescriptionInputValue}
        todos={todos}
        setTodos={setTodos}
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        initialPriority={initialPriority}
        priority={priority}
        setPriority={setPriority}
        buttonLabel={buttonLabel}
        setButtonLabel={setButtonLabel}
        user={user}
      />
      <TaskCounter todos={todos} />
      {todos.length > 0 ? (
        <TodoList
          todos={todos}
          setTodos={setTodos}
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
        <Typography mx={15}>Sinulla ei ole tehtäviä</Typography>
      )}
    </>
  )
}

export default TodoPage
