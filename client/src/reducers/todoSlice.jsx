import { createSlice } from '@reduxjs/toolkit'
import todoService from '../service/todoService'

const initialState = {
  todos: [],
  description: '',
  taskInput: '',
  selectedTask: '',
  priority: 'Normaali',
  selectedDay: Date.now(),
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload
    },
    appendTodo(state, action) {
      state.todos.push(action.payload)
    },
    removeTodo(state, action) {
      const id = action.payload
      state.todos = state.todos.filter((todo) => todo.id !== id)
    },
    modifyTodo(state, action) {
      const id = action.payload.id
      state.todos = state.todos.map((todo) =>
        todo.id !== id ? todo : action.payload
      )
    },
    setDescription(state, action) {
      state.description = action.payload
    },
    setTaskInput(state, action) {
      state.taskInput = action.payload
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload
    },
    setPriority(state, action) {
      state.priority = action.payload
    },
    setSelectedDay(state, action) {
      state.selectedDay = action.payload
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

export const {
  appendTodo,
  setTodos,
  removeTodo,
  modifyTodo,
  setDescription,
  setTaskInput,
  setSelectedTask,
  setPriority,
  setSelectedDay,
} = todoSlice.actions
export default todoSlice.reducer
