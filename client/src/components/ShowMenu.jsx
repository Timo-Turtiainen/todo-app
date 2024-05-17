import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material'

function ShowMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: '#ffffff',
          '&:hover': { color: '#58ff4f' },
        }}
      >
        Näytä
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Kesken</MenuItem>
        <MenuItem onClick={handleClose}>Valmiit</MenuItem>
        {/* <MenuItem onClick={handleClose}></MenuItem> */}
      </Menu>
    </>
  )
}

export default ShowMenu
