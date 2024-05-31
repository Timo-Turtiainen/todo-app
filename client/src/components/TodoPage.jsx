import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
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
  const filteredByPending = useSelector((state) => state.todo.filteredByPending)
  const filteredByCompleted = useSelector(
    (state) => state.todo.filteredByCompleted
  )

  // Update buttonLabel when language changes
  useEffect(() => {
    setButtonLabel(t('addButton'))
  }, [i18n.language, t])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <TodoForm buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
      {/** Show Calendar only when filter is not active */}
      {filteredByPending || filteredByCompleted ? null : <Calendar />}
      <TodoList setButtonLabel={setButtonLabel} />
    </Box>
  )
}

export default TodoPage
