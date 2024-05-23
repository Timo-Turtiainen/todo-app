import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Calendar from './Calendar'

/**
 * TodoPage component is the main page for displaying and managing the todo list.
 *
 * @returns {JSX.Element} The rendered TodoPage component.
 */
function TodoPage() {
  const { t } = useTranslation()
  const [buttonLabel, setButtonLabel] = useState(t('addButton'))

  // const todos = useSelector((state) => state.todo.todos)

  // Update buttonLabel when language changes
  useEffect(() => {
    setButtonLabel(t('addButton'))
  }, [i18n.language, t])

  return (
    <Box width={'auto'}>
      <TodoForm buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
      <Calendar />
      <TodoList setButtonLabel={setButtonLabel} />
    </Box>
  )
}

export default TodoPage
