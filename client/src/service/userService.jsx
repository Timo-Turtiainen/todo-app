import axios from 'axios'
import { setNotification } from '../reducers/notificationSlice'
import { setIsUserSaved } from '../reducers/userSlice'

const baseURL = '/api/users'

async function createUser(newUser, dispatch, t) {
  try {
    const { data } = await axios.post(baseURL, newUser)
    console.log('user service data ', data)
    dispatch(setIsUserSaved(true))
    return data
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating user:', error)

    // Handle specific error responses from the server
    const errorMessage =
      error.response?.data?.keyValue?.username ||
      error.response?.data?.keyValue?.email
    // Log the error message for clarity
    console.log('Error message:', errorMessage)

    // Dispatch actions to update the state
    dispatch(setIsUserSaved(false))

    // Add custom error message depending errorMessage variable
    dispatch(setNotification(t('errorDuplicateValue'), true, 2))
  }
}

export default { createUser }
