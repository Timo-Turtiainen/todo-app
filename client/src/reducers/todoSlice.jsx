import { createSlice } from '@reduxjs/toolkit'
import todoService from '../service/todoService'

const initialState = []
const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    setTodos(state, action) {
      return action.payload
    },
    appendTodo(state, action) {
      state.push(action.payload)
    },
    removeTodo(state, action) {
      const id = action.payload
      return state.filter((todo) => todo.id !== id)
    },
    modifyTodo(state, action) {
      const id = action.payload.id
      return state.map((todo) => (todo.id !== id ? todo : action.payload))
    },
  },
})

export const initialTodos = () => {
  return async (dispatch) => {
    const todos = await todoService.getAllTodos()
    dispatch(setTodos(todos))
  }
}

export const createNewTodo = (todo, token) => {
  return async (dispatch) => {
    const newTodo = await todoService.createTodo(todo, token)
    dispatch(appendTodo(newTodo))
  }
}

export const updateTodo = (todo, token) => {
  return async (dispatch) => {
    const updatedTodo = await todoService.updateTodo(todo, token)
    dispatch(modifyTodo(updatedTodo))
  }
}

export const deleteTodo = (todo, token) => {
  return async (dispatch) => {
    await todoService.deleteTodoByID(todo.id, token)
    dispatch(removeTodo(todo.id))
  }
}

export const { appendTodo, setTodos, removeTodo, modifyTodo } =
  todoSlice.actions
export default todoSlice.reducer
