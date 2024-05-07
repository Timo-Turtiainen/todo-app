import axios from 'axios'
const baseURL = '/api/todos'

async function getAllTodos() {
  const request = axios.get(baseURL)
  const { data } = await request
  return data
}

async function createTodo(newTodo) {
  const { data } = await axios.post(baseURL, newTodo)
  return data
}

async function updateTodo(todo) {
  const { data } = await axios.put(`${baseURL}/${todo.id}`, todo)
  return data
}

async function deleteTodoByID(id) {
  const { data } = await axios.delete(`${baseURL}/${id}`)
  return data
}
export default { getAllTodos, createTodo, updateTodo, deleteTodoByID }
