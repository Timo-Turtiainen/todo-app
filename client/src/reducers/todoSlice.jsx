import { createSlice } from '@reduxjs/toolkit'
import todoService from '../service/todoService'

const todoSlice = createSlice({
  name: 'todo',
  initialState: [],
  reducers: {
    appendTodo(state, action) {
      state.push(action.payload)
    },
  },
})

export const createNewTodo = (todo, token) => {
  return async (dispatch) => {
    const newTodo = await todoService.createTodo(todo, token)
    dispatch(appendTodo(newTodo))
  }
}
export const { appendTodo } = todoSlice.actions
