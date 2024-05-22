import { useState } from 'react'
import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import Flag from 'react-world-flags'
import { useTranslation } from 'react-i18next'

const Flag = () => {
  const languages = useSelector(state => state.todo.languages)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [anchorEl, setAnchorEl] = useState(null)
  const { t, i18n } = useTranslation()
  function handleMenu(e) {
    setAnchorEl(e.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleLanguageChange(lang) {
    console.log('lang', lang)
    setSelectedLanguage(lang)
    console.log('selected', selectedLanguage)
    handleClose()
    if (selectedLanguage.code === 'GB') {
      i18n.changeLanguage('en')
    } else if (selectedLanguage.code === 'FIN') {
      i18n.changeLanguage('fi')
    }
  }
  return (
    <div>
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
        onClose={handleClose}>
        {languages.map(lang => (
          <MenuItem key={lang.code} onClick={() => handleLanguageChange(lang)}>
            <Flag
              code={lang.code}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default Flag
