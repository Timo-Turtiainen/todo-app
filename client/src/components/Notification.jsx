import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const Notification = ({ open, handleClose, confirmDelete, todoToDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete Todo Item'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {`Are you sure you want to delete the task "${todoToDelete?.task}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={confirmDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Notification
