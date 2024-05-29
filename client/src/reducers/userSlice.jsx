import { createSlice } from '@reduxjs/toolkit'
import loginService from '../service/loginService'
import userService from '../service/userService'

const initialState = {
  users: [],
}
const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.users.push(action.payload)
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

export const createNewUser = (email, username, password) => {
  return async dispatch => {
    try {
      const newUser = await userService.createUser(email, username, password)
      dispatch(appendUser(newUser))
    } catch (error) {
      throw error
    }
  }
}

export const { setUser, appendUser } = userSlice.actions
export default userSlice.reducer
