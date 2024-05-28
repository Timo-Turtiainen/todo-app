import axios from 'axios'

const baseURL = '/api/todos'

async function getAllTodos(token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = axios.get(baseURL, config)
  const { data } = await request
  return data
}

async function createTodo(newTodo, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.post(baseURL, newTodo, config)
  return data
}

async function updateTodo(todo, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const id = todo.user
  const todoObject = { ...todo, user: id }
  const { data } = await axios.put(`${baseURL}/${todo.id}`, todoObject, config)
  return data
}

async function deleteTodoByID(id, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.delete(`${baseURL}/${id}`, config)
  return data
}
export default { getAllTodos, createTodo, updateTodo, deleteTodoByID }
