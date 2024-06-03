import { createSlice } from '@reduxjs/toolkit'
import loginService from '../service/loginService'
import userService from '../service/userService'

const initialState = {
  users: [],
  currentUser: null,
  isUserSaved: false,
  isValidEmail: false,
}

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload
    },
    appendUser(state, action) {
      state.users.push(action.payload)
    },
    setIsUserSaved(state, action) {
      state.isUserSaved = action.payload
    },
    logoutUser(state, action) {
      state.currentUser = null
      window.localStorage.clear()
      loginService.setToken(null)
    },
    setIsValidEmail(state, action) {
      state.isValidEmail = action.payload
    },
  },
})

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const loggedUser = await loginService.login(username, password)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      loginService.setToken(loggedUser)
      dispatch(setUser(loggedUser))
    } catch (error) {
      console.log(`error on log in! error code:${error.response.data.error}`)
    }
  }
}

export const createNewUser = (user, t) => {
  return async dispatch => {
    const newUser = await userService.createUser(user, dispatch, t)
    dispatch(appendUser(newUser))
  }
}

export const validateEmail = email => {
  return async dispatch => {
    const user = await userService.verifyEmail(email)
    // USER EXISTS
    if (user) {
      dispatch(setIsValidEmail(true))

      return user
      // set new password
    } else {
      dispatch(setIsValidEmail(false))
    }
  }
}

export const changePassword = (user, password) => {
  return async dispatch => {
    const updateUserPassword = await userService.resetPassword(user, password)
    dispatch(setUser(updateUserPassword))
  }
}

export const {
  setUser,
  appendUser,
  setIsUserSaved,
  logoutUser,
  setIsValidEmail,
} = userSlice.actions
export default userSlice.reducer
