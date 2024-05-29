import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from '@mui/material'
import { darkTheme } from './Theme'
import { useTranslation } from 'react-i18next'

/**
 * CustomButton is a styled button component with customized styles for different states.
 *
 * @param {object} props - The component props.
 * @param {object} props.theme - The MUI theme object.
 * @returns {JSX.Element} A styled Button component.
 */
const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: darkTheme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}))

/**
 * Notification component renders a confirmation dialog for deleting a todo item.
 *
 * @param {boolean} props.open - Indicates if the dialog is open.
 * @param {function} props.handleClose - Function to handle closing the dialog.
 * @param {function} props.confirmDelete - Function to handle the delete confirmation action.
 * @param {object} props.todoToDelete - The todo item to be deleted.
 * @returns {JSX.Element} The rendered Notification component.
 */
function DeleteConfirmation({
  open,
  handleClose,
  confirmDelete,
  todoToDelete,
}) {
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>
        {t('deleteTaskMessage')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ color: darkTheme.palette.text.primary }}
          id='alert-dialog-description'>
          {`${t('deleteTaskConfirmation')}${todoToDelete?.task}"?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={handleClose}>{t('cancel')}</CustomButton>
        <CustomButton onClick={confirmDelete} autoFocus>
          {t('delete')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmation
