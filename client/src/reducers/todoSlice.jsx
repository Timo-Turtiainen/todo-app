import { createSlice } from '@reduxjs/toolkit'
import todoService from '../service/todoService'
import i18n from '../i18n'
import { fi, enUS } from 'date-fns/locale'

const initialState = {
  todos: [],
  description: '',
  taskInput: '',
  selectedTask: '',
  priority: '',
  selectedDay: Date.now(),
  selectedLanguage: {
    code: navigator.language.includes('fi') ? 'FIN' : 'GB',
    label: navigator.language.includes('fi') ? 'Suomi' : 'English',
  },
  languages: [
    { code: 'GB', label: 'English' },
    { code: 'FIN', label: 'Suomi' },
  ],
  filteredByPending: false,
  filteredByCompleted: false,
  searchText: '',
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
      state.todos = state.todos.filter(todo => todo.id !== id)
    },
    modifyTodo(state, action) {
      const id = action.payload.id
      state.todos = state.todos.map(todo =>
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
    setSelectedLanguage(state, action) {
      const language = action.payload
      console.log('selected lang code', language)
      if (language.code === 'GB') {
        i18n.changeLanguage('en')
      } else if (language.code === 'FIN') {
        i18n.changeLanguage('fi')
      }
      state.selectedLanguage = language
    },
    setFilteredByPending(state, action) {
      state.filteredByPending = action.payload
    },
    setFilteredByCompleted(state, action) {
      state.filteredByCompleted = action.payload
    },
    setSearhText(state, action) {
      state.searchText = action.payload
    },
  },
})

export const initialTodos = () => {
  return async dispatch => {
    const todos = await todoService.getAllTodos()
    dispatch(setTodos(todos))
  }
}

export const createNewTodo = (todo, token) => {
  return async dispatch => {
    const newTodo = await todoService.createTodo(todo, token)
    dispatch(appendTodo(newTodo))
  }
}

export const updateTodo = (todo, token) => {
  return async dispatch => {
    const updatedTodo = await todoService.updateTodo(todo, token)
    dispatch(modifyTodo(updatedTodo))
  }
}

export const deleteTodo = (todo, token) => {
  return async dispatch => {
    await todoService.deleteTodoByID(todo.id, token)
    dispatch(removeTodo(todo.id))
  }
}

export function handleLocaleSwitch(lang) {
  if (lang.code === 'FIN') {
    return fi
  } else if (lang.code === 'GB') {
    return enUS
  }
}

export const pendingTasks = () => {
  return async dispatch => {
    const todos = await todoService.getAllTodos()
    const pendingTodos = todos.filter(todo => !todo.complete)
    dispatch(setTodos(pendingTodos))
  }
}

export const completedTasks = () => {
  return async dispatch => {
    const todos = await todoService.getAllTodos()
    const completedTodos = todos.filter(todo => todo.complete)
    dispatch(setTodos(completedTodos))
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
  setSelectedLanguage,
  setFilteredByPending,
  setFilteredByCompleted,
  setSearhText,
} = todoSlice.actions
export default todoSlice.reducer
