import { useState } from 'react'
import { IconButton, Menu, MenuItem, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import Flag from 'react-world-flags'

import { setSelectedLanguage } from '../reducers/todoSlice'

function LanguageToggle() {
  const dispatch = useDispatch()
  const languages = useSelector((state) => state.todo.languages)
  const selectedLanguage = useSelector((state) => state.todo.selectedLanguage)
  const [anchorEl, setAnchorEl] = useState(null)

  function handleMenu(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose() {
    setAnchorEl(null)
  }

  function handleLanguageChange(lang) {
    dispatch(setSelectedLanguage(lang))
    handleMenuClose()
  }

  return (
    <Box>
      <IconButton edge='end' color='inherit' onClick={handleMenu}>
        <Flag code={selectedLanguage.code} style={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang)}>
            <Flag
              code={lang.code}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default LanguageToggle
