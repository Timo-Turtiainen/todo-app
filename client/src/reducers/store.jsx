import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import userReducer from './userSlice'
import notificationReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    todo: todoReducer,
    users: userReducer,
    notification: notificationReducer,
  },
})

export default store
