import { useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { pendingTasks } from '../reducers/todoSlice'
import {
  setFilteredByPending,
  setFilteredByCompleted,
} from '../reducers/todoSlice'

function TaskFilter() {
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  function handleMenu(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function showPendingTasks() {
    dispatch(setFilteredByPending(true))
    dispatch(pendingTasks())
    handleMenuClose()
  }
  return (
    <Box>
      <IconButton onClick={handleMenu}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={showPendingTasks}>
          <Typography paragraph>{t('pendingTasks')}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography paragraph>{t('completedTasks')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default TaskFilter
