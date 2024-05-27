import { useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { completedTasks, pendingTasks } from '../reducers/todoSlice'
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

  function showCompletedTasks() {
    dispatch(setFilteredByCompleted(true))
    dispatch(completedTasks())
    handleMenuClose()
  }

  function showDefault() {
    dispatch(setFilteredByPending(false))
    dispatch(setFilteredByCompleted(false))
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
        onClose={handleMenuClose}>
        <MenuItem onClick={showPendingTasks}>
          <Typography paragraph>{t('pendingTasks')}</Typography>
        </MenuItem>
        <MenuItem onClick={showCompletedTasks}>
          <Typography paragraph sx={{ alignItems: 'center' }}>
            {t('completedTasks')}
          </Typography>
        </MenuItem>
        <MenuItem onClick={showDefault}>
          <Typography paragraph>{t('showDefaultTasks')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default TaskFilter
