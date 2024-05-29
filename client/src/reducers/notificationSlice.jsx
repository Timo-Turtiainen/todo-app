import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', isError: false },
  reducers: {
    notification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return { ...state, content: '', isError: false }
    },
  },
})

export const setNotification = (content, isError, time) => {
  return async dispatch => {
    dispatch(notification({ content, isError }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { notification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
