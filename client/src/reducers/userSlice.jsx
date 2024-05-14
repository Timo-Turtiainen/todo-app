import { createSlice } from '@reduxjs/toolkit'
import loginService from '../service/loginService'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
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

export const { setUser } = userSlice.actions
export default userSlice.reducer
