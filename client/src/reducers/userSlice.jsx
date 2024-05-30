import { createSlice } from '@reduxjs/toolkit'
import loginService from '../service/loginService'
import userService from '../service/userService'

const initialState = {
  users: [],
  isUserSaved: false,
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
    setIsUserSaved(state, action) {
      state.isUserSaved = action.payload
    },
  },
})

export const loginUser = (username, password) => {
  console.log('userSlice ', username, password)
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
    console.log(user)
    const newUser = await userService.createUser(user, dispatch, t)
    console.log(newUser)
    dispatch(appendUser(newUser))
  }
}

export const { setUser, appendUser, setIsUserSaved } = userSlice.actions
export default userSlice.reducer
